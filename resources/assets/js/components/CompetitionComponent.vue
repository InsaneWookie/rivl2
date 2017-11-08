<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">{{items.name}}</div>

                    <div class="panel-body">
                        <ul>
                            <li v-for="(competitor, index) in items.competitors">
                                {{competitor.name}} - {{competitor.elo.elo}}

                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
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
                response.data.competitors = _.orderBy(response.data.competitors, [(competitor) => { return competitor.elo.elo; }], ['desc']);

                data.items = response.data;
            });

            return data;
        }
    }
</script>
