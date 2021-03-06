CurrentUserWatchlistView = Backbone.View.extend({

  className: 'eachwatchlist',

  initialize: function () {
    var self = this;
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.template = _.template($('#watchlistview').html());
    this.$el.data(this.model)

    //if these are the current user's posts, can't be draggable\

      this.$el.attr("draggable", "true")
      this.$el.draggable({
      cursor: "pointer",
        helper: "clone",
        container: "document",
        revert: 'invalid',
        opacity: .7
      });

    $("#trash").droppable({
        accept: ".eachwatchlist",
        hoverClass: "trashing-hover",
        tolerance: "pointer",
        drop: function (event, ui) {
          self.doStopStuff(event, ui)
          console.log("stuff")
        }
    });


  },

  doStopStuff: function (droppable, draggable) {
    var object = draggable.draggable.data();

    draggable.draggable.fadeOut(300, function () {
        object.destroy()
    })

  },

  events: {
    'click .destroy': 'delete'
  },

  render: function (){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  delete: function (){
    var self = this.model;
    this.$el.fadeOut(300, function () {
        self.destroy();
    })
  },

  // edit: function (){
  //   this.$el.addClass('editing');
  //   this.$form = $('.form');
  //   this.$form.removeClass('hidden')
  //   // this.model.set({message: input.val()}).save();
  // },

});