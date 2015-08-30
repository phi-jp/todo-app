
;(function() {

  var todoList = [];

  // init
  window.onload = function() {
    load();

    $('#btnArchive').on('click', function() {
      archive();
    });

    $('#addForm').on('submit', function(e) {
      var todo = $(this).find('[name=todo]');
      addTodo({
        text: todo.val(),
        done: false,
      }, true);
      return false;
    });

    // todo の内容を反映
    todoList.forEach(function(todo) {
      addTodo(todo, false);
    });
  };

  // load form localStorage
  var load = function() {
    // check exist
    if (localStorage.getItem('todo')) {
      var temp = localStorage.getItem('todo');
      todoList = JSON.parse(temp);
    }
  };

  var save = function() {
    localStorage.setItem('todo', JSON.stringify(todoList));
  };

  var archive = function() {
    var todoListElement = $('#todoList');
    todoListElement.children().each(function(i, li) {
      var li = $(li);
      var item = li.data('item');
      if (item.done) {
        li.remove();
        removeTodo(item);
      }
    });
  };

  // add todo
  var addTodo = function(item, sync) {

    if (sync) {
      todoList.push(item);
      save();
    }

    var todoListElement = $('#todoList');
    var li = $('\
<li>\
  <input type="checkbox" />\
  <span></span>\
  <input type="text" class="hide" />\
</li>\
');
    todoListElement.append(li);
    li.data('item', item);

    var checkbox = li.find('input[type="checkbox"]');
    var span = li.find('span');
    var input  = li.find('input[type="text"]');
    checkbox.on('change', function() {
      if (this.checked) {
        li.addClass('done');
        item.done = true;
      }
      else {
        item.done = false;
        li.removeClass('done');
      }
      save();
    });

    if (item.done) {
      checkbox.prop('checked', true);
      li.addClass('done');
    }

    var text = item.text;
    span.text(text);
    input.val(text);

    span.on('click', function() {
      span.addClass('hide');
      input.removeClass('hide');
      input.focus();
    });
    input.on('blur', function() {
      input.addClass('hide');
      span.removeClass('hide');

      var text = input.val();
      span.text(text);
      input.val(text);
      item.text = text;
      save();
    });
  };

  // remove todo
  var removeTodo = function(item) {
    var i = todoList.indexOf(item);
    todoList.splice(i, 1);
    save();
  };


})();

