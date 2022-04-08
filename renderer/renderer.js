console.log('DOM init');
window.addEventListener("DOMContentLoaded", async () => {
    console.log('DOM Loaded');
    const { api } = window;

    $("#add").on('click', () => {
        let str = $("#str").val()
        console.log(str);
        api.send("create:todo", str);
    })
    $(document).on("click", '.close', function (event) {
        let str = $(this).prev().text()
        api.send("remove:todo", str);
    });

    // Rehydratation
    api.receive('fetch:todos', (el) => {
        console.log(el[0]);
        todos = el[0]
        $('#todos').html(ejs.render(`
        <% todos.forEach(function(todo){ %>
            <div class="card">
              <p class="todo">
                <%- todo %>
              </p>
              <button class="close">close</button>
            </div>
            <% }); %>
        `, {todos: todos}))
    });
});

