let topics = [
    'aesthetic geometry',
    'reaction diffusion',
    'simple ricks'
];

const giphy_api_key = 'MiGL51eeISOE7wrHzrBCY1bBCX9YcfnI';

const renderLayout = (selector) => {
    let $selector = $(selector);
    $('<div class="topics">').appendTo($selector);
    $('<div class="add-topic-form">').appendTo($selector);
}

const renderForm = (selector) => {
    let $selector = $(selector);
    $selector.empty();
    let $form = $('<form>');
    $('<div class="input-group mb-2">')
        .append($('<input class="form-control form-control-lg" type="text" id="input-topic" placeholder="enter a topic">'))
        .append($('<div class="input-group-prepend">')
            .append($('<button class="btn btn-primary btn-add-topic">').text('+')))
        .appendTo($form);
    $form.appendTo(selector);
};

const renderTopics = (selector) => {
    let $selector = $(selector);
    $selector.empty();
    topics.forEach((topic) => {
        $('<button class="btn btn-topic">').text(topic).data('topic', topic).appendTo($selector);
    });
};

$(document).ready(() => {
    renderLayout('body');
    renderTopics('.topics');
    renderForm('.add-topic-form');

    $(document).on('click', '.btn-topic', (e) => {
        $.ajax({
            'url': `https://api.giphy.com/v1/gifs/search?q=${$(e.target).data('topic')}&limit=10&api_key=${giphy_api_key}`,
            'method': 'GET'
        })
        .then((response) => {
            let items = response.data;
            items.forEach((item) => {
                let img_url_anim = item.images.fixed_height_small.url;
                let img_url_still = item.images.fixed_height_small_still.url;
                let item_title = item.title.split('GIF')[0].trim();
                let $container = $('<div class="gif-container">');
                $('<img class="gif">')
                    .attr('src',img_url_still)
                    .data('still', img_url_still)
                    .data('anim', img_url_anim)
                    .data('state','still')
                    .appendTo($container);
                $('<div class="title">').text(item_title).appendTo($container);
                $('<div class="rating">').text(item.rating).appendTo($container);
                $container.appendTo('body');
            });
        });
    });

    $(document).on('click', 'img.gif', (e) => {
        let $this = $(e.target);
        $this.attr('src', $this.data('state') == 'still'? $this.data('anim') : $this.data('still'));
        $this.data('state', $this.data('state') == 'still'? 'anim' : 'still');
        $this.parent().find(':not(img.gif)').toggle('fade');
    });

    $(document).on('click', '.btn-add-topic', (e) => {
        e.preventDefault();
        topics.push($('#input-topic').val());
        console.log(topics);
        renderTopics('.topics');
    });
});