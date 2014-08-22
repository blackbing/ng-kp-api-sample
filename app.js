/**
 * @jsx React.DOM
 */
var API= {
  KEY:"kp53f77ea99833c2.17206777",
  SERVER:"http://api.kptaipei.tw/v1/",
  getCategory: function(id){
    id = id?id:'';
    return $.get(this.SERVER+"category/"+id+"?accessToken="+this.KEY)
  }
};

var Article = React.createClass({
  getInitialState: function(){
    return {
      articles: []
    }
  },
  getArticle: function(idx){
    return this.state.articles[idx] || null;
  },
  componentDidMount: function(){
    var _this = this;
    var id = this.props.id;
    API.getCategory(id).done( function(response){
      _this.setState({articles: response.data});
      if( !content.state.content){
        content.setState(response.data[0]);
      }

    });
  },
  clickOnArticle: function(event){
    $target = $(event.target);
    var idx = $target.data('idx');
    var article = ( this.getArticle( idx));
    content.setState( article );
  },
  render: function(){
    var _this = this;
    var items = {};
    this.state.articles.forEach( function(item,idx){
      var id = item.id;
      items['article_'+id] = <li className="article" data-idx={idx} onClick={_this.clickOnArticle}>{item.title}</li>;
    });
    return <ul className='articles'>{items}</ul>;
  }
});

var Category = React.createClass({
  getInitialState: function(){
    return {
      categories: []
    }
  },
  componentDidMount: function(){
    var _this = this;
    API.getCategory().done( function(response){
      _this.setState({categories: response.data});
    });
  },
  render: function(){
    var items = {};
    this.state.categories.forEach( function(item){
      var id = item.id
      items['category_'+id] = <li className="category" >{item.name}<Article id={id} /></li>;
    });

    return <ul className='categories'>{items}</ul>;
  }
});

var Content = React.createClass({
  getInitialState: function(){
    return {
      title: '請選擇文章',
      content: ''
    }
  },
  render: function(){
    return <div>
      <h2>{this.state.title}</h2>
      <div dangerouslySetInnerHTML={{__html: this.state.content}}></div>
    </div>;
  }
});



React.renderComponent( <Category />, document.getElementById('categoryContainer'));
var content = React.renderComponent( <Content />, document.getElementById('content'));
