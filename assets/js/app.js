let tags = [
    'late capitalism',
    'hypernormalization',
    'psyops'
]

$(document).ready(function() {
    tags.forEach((tag) => {
        $('<button>').text(tag).data('tag', tag).appendTo('body');
    });
});