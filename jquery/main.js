
;(function() {

  var todoList = [];

  // load
  if (localStorage.getItem('todo')) {
    var temp = localStorage.getItem('todo');
    todoList = JSON.parse(temp);
  }

  // init
  window.onload = function() {
    $('#addForm').on('submit', function(e) {
      var todo = $(this).find('[name=todo]');
      addTodo(todo.val(), true);
      return false;
    });

    // todo の内容を反映
    todoList.forEach(function(todo) {
      addTodo(todo.text, false);
    });
  };

  // add todo
  var addTodo = function(text, sync) {
    var item = {
      text: text,
    };

    if (sync) {
      todoList.push(item);
      localStorage.setItem('todo', JSON.stringify(todoList));
    }

    var todoListElement = $('#todoList');
    var li = $('<li>');
    todoListElement.append(li);
    li.data('item', item);
    // checkbox
    var checkbox = $('<input type="checkbox" />');
    li.append(checkbox);
    // span
    var span = $('<span>');
    li.append(span);
    span.text(text);
    span.on('click', function() {
    });

    li.on('click', function() {
      // var self = $(this);
      // self.remove();
      // removeTodo(self.data('item'));
    });
  };

  // remove todo
  var removeTodo = function(item) {
    var i = todoList.indexOf(item);
    todoList.splice(i, 1);
    localStorage.setItem('todo', JSON.stringify(todoList));
  };

})();

