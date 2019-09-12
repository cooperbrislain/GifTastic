let tags = [
    'late capitalism',
    'hypernormalization',
    'psyops',
    'simpsons wave',
    'wook'
];

const giphy_api_key = 'MiGL51eeISOE7wrHzrBCY1bBCX9YcfnI';

$(document).ready(function() {
    tags.forEach((tag) => {
        $('<button>').text(tag).data('tag', tag).appendTo('body');
    });

    $(document).on('click', 'button', (e) => {
        $.ajax({
            'url': `https://api.giphy.com/v1/gifs/search?q=${$(e.target).data('tag')}&api_key=${giphy_api_key}`,
            'method': 'GET'
        })
        .then((response) => {
            let items = response.data;
            items.forEach((item) => {
                let img_url_anim = item.images.fixed_height_small.url;
                let img_url_still = item.images.fixed_height_small_still.url;
                $('<img>')
                    .attr('src',img_url_still)
                    .data('still', img_url_still)
                    .data('anim', img_url_anim)
                    .data('state','still')
                    .appendTo('body');
            });
        });
    });

    $(document).on('click', 'img', (e) => {
        let $this = $(e.target);
        $this.attr('src', $this.data('state') == 'still'? $this.data('anim') : $this.data('still'));
        $this.data('state', $this.data('state') == 'still'? 'anim' : 'still');
    });
});