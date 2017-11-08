<template>
    <div id="playerSelectModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content row">
                <div class="modal-body">
                    <ul id="left_player_select" class="list-group col-xs-12">
                        <li v-for="(competitor, index) in items.competitors">
                            {{competitor.name}}
                        </li>
                    </ul>
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
                response.data.competitors = _.orderBy(response.data.competitors, [(competitor) => { return competitor.name; }], ['asc']);

                data.items = response.data;
            });

            return data;
        }
    }
</script>