<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Games</div>

                    <div class="panel-body">
                        <ul>
                            <li v-for="(item, index) in items">
                                <router-link :to="{name: 'competition', params: {id: item.id}}">{{ item.name }}</router-link>
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
            //this is totally not the way to get data
            let data = {items: []};
            axios.get('/api/competition').then(function (response) {
                data.items = response.data;
            });

            return data;
        }
    }
</script>
