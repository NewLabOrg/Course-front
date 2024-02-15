<template> 
    <div >
        <Header />
        <Allposts />
    </div>
</template>

<script>
import Header from '../components/beaty/Header.vue';
import Allposts from '../components/Allposts.vue';
export default {
    name: 'AllPost',
    components: {
        Header,
        Allposts
    }
}
</script>