<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Game entry for {{items.name}}</div>

                    <div class="panel-body">
                        <div class="newGameContainer sectionBody text-center">
                            <div id="playerSection" class="row text-center">
                                <div id="selectPlayer1" class="col-xs-5">
                                    <img src="images/selectPlayer.jpg" />
                                </div>
                                <div id="vsLabel" class="col-xs-2">
                                    VS
                                </div>
                                <div id="selectPlayer2" class="col-xs-5 text-center">
                                    <img src="images/selectPlayer.jpg" v-on:click="selectPlayer()" data-toggle="modal" data-target="#playerSelectModal" />
                                </div>
                            </div>

                            <div id="winnerBtns" class="row text-center">
                                <div class="col-xs-5">
                                    <button id="player1Btn" class="btn btn-default btn-block addScore"></button>
                                </div>
                                <div class="col-xs-2">Select winner</div>
                                <div class="col-xs-5 text-center">
                                    <button id="player2Btn" class="btn btn-default btn-block addScore"></button>
                                </div>
                            </div>

                            <div id="scoresSection" class="row"></div>
                            <div id="resultsSection" class="row"></div>

                            <button id="removeScore" class="btn-sm btn" style="display: none;">Remove score</button>
                            <button id="submitScore" class="btn btn-lg btn-disabled btn-block" style="display: none;">Save result</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <competitor-select-modal-component></competitor-select-modal-component>
    </div>

</template>

<script>
    export default {

        mounted() {
        },
        data: function () {
            let competitionId = this.$route.params.id;
            //this is totally not the way to get data
            let data = {items: []};

            axios.get('/api/competition/' + competitionId + '/competitor').then(function (response) {
                response.data.competitors = _.orderBy(response.data.competitors, [(competitor) => { return competitor.name; }], ['asc']);

                data.items = response.data;
            });

            return data;
        },
        // define methods under the `methods` object
        methods: {
            selectPlayer: function (event) {
                // `this` inside methods points to the Vue instance
                alert('Hello ' + this.name + '!');
                // `event` is the native DOM event
                if (event) {
                    alert(event.target.tagName);
                }
            }
        }

    }
</script>
