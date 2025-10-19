const SearchBar = {
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    emits: ['search'],
    data() {
        return {
            searchQuery: ''
        };
    },
    template: `
        <div class="search-container">
            <form @submit.prevent="handleSubmit" class="search-form">
                <input
                    type="text"
                    v-model="searchQuery"
                    placeholder="Enter city name (e.g., London, New York, Tokyo)"
                    class="search-input"
                    :disabled="loading"
                    @keyup.enter="handleSubmit"
                />
                <button 
                    type="submit" 
                    class="search-btn"
                    :disabled="loading || !searchQuery.trim()"
                >
                    <i :class="loading ? 'fas fa-spinner fa-spin' : 'fas fa-search'"></i>
                    {{ loading ? 'Searching...' : 'Search' }}
                </button>
            </form>
        </div>
    `,
    methods: {
        handleSubmit() {
            if (this.searchQuery.trim() && !this.loading) {
                this.$emit('search', this.searchQuery.trim());
            }
        }
    }
};
