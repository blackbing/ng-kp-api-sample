/**
 * @jsx React.DOM
 */
var API= {
  KEY:"kp53f6c3de743a16.84028342",
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
  componentDidMount: function(){
    var _this = this;
    var id = this.props.id;
    API.getCategory(id).done( function(response){
      console.log(response);
      _this.setState({articles: response.data});

    });
  },
  clickOnArticle: function(event){
    console.log(event.target);
    $target = $(event.target);
    console.log($target.data('id'));
  },
  render: function(){
    var _this = this;
    var items = {};
    this.state.articles.forEach( function(item,id){
      var id = item.id;
      items['article_'+id] = <li className="article" data-id={id} onClick={_this.clickOnArticle}>{item.title}</li>;
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
      console.log(response);
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



React.renderComponent( <Category />, document.getElementById('categoryContainer'));
