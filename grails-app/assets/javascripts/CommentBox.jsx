class CommentBox extends React.Component {
    constructor(props) {
        this.state = {data: []};
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.componentDidMount = this.componentDidMount;
    }

    loadCommentsFromServer() {
        axios.get(this.props.url).then(
            function (response) {
                this.setState({data: response.data});
            }.bind(this)
        );
    }

    handleCommentSubmit(comment) {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});

        axios.post(this.props.url, data).then(
            function (response) {
                this.setState({data: response.data});
            }.bind(this)
        );
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
}