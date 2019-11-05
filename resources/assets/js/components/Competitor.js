import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FileUploadModal from "./FileUploadModal";

import {BarChart, Cell, Bar, XAxis, YAxis, ResponsiveContainer} from 'recharts';

export default class Competitor extends Component {
  constructor(props) {
    super(props);


    this.state = {
      //competition: props.competition,
      playerStats: {},

      player: {
        id: 0,
        name: '',
        points: 0,
        games: 0,
        elo: {
          status: 'inactive'
        },
        winPercentage: 0,
        avatar_image: 'http://via.placeholder.com/80x80'
      },
      graph: [],
      graphDomain: ['auto', 'auto']

    };

    this.showFileUploadModal = this.showFileUploadModal.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleStatusCheckbox = this.handleStatusCheckbox.bind(this);
  }

  componentWillMount() {

    axios
      .get(`/api/competition/${this.props.competition.id}/competitor/${this.props.competitor}`)
      .then(res => {
        let data = res.data;

        data.points = Math.round(data.elo.elo);
        if(!data.avatar_image){
          data.avatar_image ='http://via.placeholder.com/80x80';
        }
        this.setState({player: data});
      });

    axios
      .get(`/api/competition/${this.props.competition.id}/competitor_stats/${this.props.competitor}`)
      .then(res => {
        let stats = res.data;
        stats.winPercentage = stats.games_played === 0 ? 0 : Math.round(stats.wins/stats.games_played * 100);
        this.setState({playerStats: stats});
      });

    axios.get(`/api/competition/${this.props.competition.id}/competitor_graph_stats/${this.props.competitor}`)
      .then(res => {
        let graphData = this.convertGraphData(res.data);
        let max = Math.abs(_.maxBy(graphData, (d) => {return Math.abs(d.y);}).y);

        let domain = [max * -1, max] ;
        this.setState({
          graph: graphData,
          graphDomain: domain
        });
      });


  }

  convertGraphData(responseData){
    let greens = ['#71a95a', '#007944'],
        reds = ['#f16363', '#cb2727'];
    return responseData.map((score, index) => {
      let eloChange = parseFloat((score.elo_after - score.elo_before).toFixed(2));
      return {
        y: eloChange,
        x: index,
        f: (eloChange < 0) ? reds[index % 2] : greens[index % 2]
      }
    })
  }

  uploadFile(form){

    let fd = new FormData(form);
   // fd.append('avatar', this.fileInput);
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return axios.post(`/api/competitor/${this.state.player.id}/avatar`, fd, config).then((res) => {
      console.log(res);
    })
  }

  showFileUploadModal(e){
    e.preventDefault();
  }

  handleStatusCheckbox(e){
    //invert status (should this be using previous state?)
    let status = this.state.player.elo.status === 'active' ? 'inactive' : 'active';

    //am I allowed to do this state update here and in the ajax callback? (no race conditions?)
    this.setState({player: {...this.state.player,  elo: {...this.state.player.elo, status: status}}});

    let competitor = {
      elo: {
        ...this.state.player.elo,
        status: status
      }
    };

    //this is a little funky, it doesn't update the checkbox until the request comes back
    axios
      .put(`/api/competition/${this.props.competition.id}/competitor/${this.props.competitor}`, competitor)
      .then(res => {
        //this feels crazy
        this.setState({player: {...this.state.player,  elo: {...this.state.player.elo, status: status}}});
      });
  }

  render() {
    return (
      <div>
        <div className="card main-card mb-4">
          <div className="card-body">
            <h4 className="card-title d-flex align-items-center mb-0">
              <a href='#' onClick={this.showFileUploadModal} data-toggle="modal" data-target="#fileUploadModal">
                <img
                  src={this.state.player.avatar_image}
                  alt={`${this.state.player.name}'s avatar'`}
                  className="avatar mr-4"
                  style={{maxWidth: '80px'}}
                />
              </a>
              {this.state.player.name}
            </h4>
          </div>
        </div>
        <div className="card main-card mb-4">
          <div className="card-body">
            <h4 className="card-title d-flex align-items-center">
              {this.props.competition.name} ({this.state.player.points}pts)
            </h4>
            <p>
              {this.state.playerStats.games_played} games ({this.state.playerStats.winPercentage}% wins)
              <br />
            </p>
            <div className="custom-control custom-checkbox">
              <input type="checkbox" name="status" className="custom-control-input" id="player_status" checked={this.state.player.elo.status === 'active'}
                     onChange={this.handleStatusCheckbox} />
              <label className="custom-control-label" htmlFor="player_status">Active</label>
            </div>
            <br />
            <p>
              <strong>Recent games</strong>
            </p>
            <div style={{height: 300}}>
              <ResponsiveContainer>
                <BarChart  data={this.state.graph}
                           barGap={0} barCategoryGap={-1}>
                  <XAxis dataKey="x" hide={true} />
                  <YAxis domain={this.state.graphDomain}/>
                  <Bar dataKey="y"  stroke-width="0" >
                    {
                      this.state.graph.map((entry, index) => {
                        return <Cell key={index} fill={entry.f} />;
                      })
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <FileUploadModal uploadFile={this.uploadFile}/>
      </div>
    );
  }
}
