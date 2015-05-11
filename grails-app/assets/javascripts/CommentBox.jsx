class CommentBox extends React.Component {
    constructor(props) {
        this.state = {data: []};
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
        this.componentDidMount = this.componentDidMount;
    }

    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleCommentSubmit(comment) {
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentDidMount() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    }

    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
}
//
//var CommentBox = React.createClass({
//    loadCommentsFromServer: function() {
//        $.ajax({
//            url: this.props.url,
//            dataType: 'json',
//            cache: false,
//            success: function(data) {
//                this.setState({data: data});
//            }.bind(this),
//            error: function(xhr, status, err) {
//                console.error(this.props.url, status, err.toString());
//            }.bind(this)
//        });
//    },
//    handleCommentSubmit: function(comment) {
//        var comments = this.state.data;
//        var newComments = comments.concat([comment]);
//        this.setState({data: newComments});
//
//        $.ajax({
//            url: this.props.url,
//            dataType: 'json',
//            type: 'POST',
//            data: comment,
//            success: function(data) {
//                this.setState({data: data});
//            }.bind(this),
//            error: function(xhr, status, err) {
//                console.error(this.props.url, status, err.toString());
//            }.bind(this)
//        });
//    },
//    getInitialState: function() {
//        return {data: []};
//    },
//    componentDidMount: function() {
//        this.loadCommentsFromServer();
//        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
//    },
//    render: function() {
//        return (
//            <div className="commentBox">
//                <h1>Comments</h1>
//                <CommentList data={this.state.data} />
//                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
//            </div>
//        );
//    }
//});