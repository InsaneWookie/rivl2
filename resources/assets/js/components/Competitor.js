import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FileUploadModal from "./FileUploadModal";

export default class Competitor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      competition: {},
      playerStats: {},

      player: {
        id: 0,
        name: '',
        points: 0,
        games: 0,
        winPercentage: 0,
        avatar_image: 'http://via.placeholder.com/80x80'
      }
    };

    this.showFileUploadModal = this.showFileUploadModal.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }


  componentWillMount() {

    axios
      .get(`/api/competition/${this.props.competition}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          competition: res.data,
        });
      })
      .catch(error => {
        console.log(error);
      });

    //load all the competitors for this competition
    axios
      .get(`/api/competition/${this.props.competition}/competitor/${this.props.competitor}`)
      .then(res => {
        console.log(res.data);

        let data = res.data;

        data.points = Math.round(data.elo.elo);
        data.games = 123;
        data.winPercentage = 64;
        if(!data.avatar_image){
          data.avatar_image ='http://via.placeholder.com/80x80';
        }


        this.setState({player: data});
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`/api/competition/${this.props.competition}/competitor/${this.props.competitor}/stats`)
      .then(res => {
        let stats = res.data;
        stats.winPercentage = stats.games_played === 0 ? 0 : Math.round(stats.wins/stats.games_played * 100);
        this.setState({playerStats: stats});
      });
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
              {this.state.competition.name} ({this.state.player.points}pts)
            </h4>
            <p>
              {this.state.playerStats.games_played} games ({this.state.playerStats.winPercentage}% wins)
            </p>
            <p>
              <strong>Recent games</strong>
            </p>
            Coming soon
          </div>
        </div>

        <FileUploadModal uploadFile={this.uploadFile}/>
      </div>
    );
  }
}
