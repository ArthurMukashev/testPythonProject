window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

function setSpinner(element) {
    element.html(`<div class="spinner-border m-3" role="status"></div>`)
}

function setAlert(color, text) {
    $('#alert').html(`<div class="alert alert-${color} my-3">${text}</div>`)
}

function getMenu(filters = {}, menu = $('.menu.active')) {
    let page = filters.page
    $.ajax({
        url: menu.data('module'),
        data: { option: menu.data('option'), filters: filters, title: menu.html() },
        type: 'GET',
        beforeSend: setSpinner($('#main_content')),
        success: function (response) {
            response = JSON.parse(response)
            $('#main_content').html(response.html)
            if (filters) {
                $.each(filters, function (elem, i) {
                    $('select[data-val="' + elem + '"]').val(i)
                })
            }
            if (page) {
                $('.page-item').removeClass('active')
                $('.page-item[data-val="' + page + '"]').addClass('active')
            }
        }
    })

}

function actionForm(form) {
    $.ajax({
        url: form.attr('action'),
        type: 'POST',
        data: form.serialize(),
        beforeSend: setSpinner($('#alert')),
        success: function (response) {
            response = JSON.parse(response)
            setAlert(response.class, response.text)
            if (response.class === 'success') {
                Swal.fire(
                    'Успешно!',
                    '',
                    'success'
                ).then(getMenu)
            }

        }
    })
}

function actionFileForm(form, form_data) {
    $.ajax({
        url: form.attr('action'),
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        data: form_data,
        beforeSend: setSpinner($('#alert')),
        success: function (response) {
            response = JSON.parse(response)
            setAlert(response.class, response.text)
            if (response.class === 'success') {
                Swal.fire(
                    'Успешно!',
                    '',
                    'success'
                ).then(getMenu)
            }
        }
    })
}

$(document).ready(function () {

    $('.menu').on('click', function (event) {
        event.preventDefault()
        $('.menu').removeClass('active')
        $(this).addClass('active')
        getMenu()

        console.log($(this).data('option'))
    })

    $(document).on('submit', '.action-form', function (event) {
        event.preventDefault()
        Swal.fire({
            title: 'Подтвердите действие!',
            text: 'Отменить действие будет невозможно!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Да!',
            cancelButtonText: 'Нет!'
        }).then((result) => {
            if (result.isConfirmed) {
                actionForm($(this))
            }
        })
    })

    $(document).on('submit', '.file-form', function (event) {
        event.preventDefault()

        var form_data = new FormData()

        $(this).find('[name]').each(function (i, v) {
            if ($(v).prop('files')) {
                form_data.append($(v).prop('name'), $(v).prop('files')[0])
            } else {
                form_data.append($(v).prop('name'), $(v).val())
            }
        })
        Swal.fire({
            title: 'Подтвердите действие!',
            text: 'Отменить это действие будет невозможно!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Да!',
            cancelButtonText: 'Нет!'
        }).then((result) => {
            if (result.isConfirmed) {
                actionFileForm($(this), form_data)
            }
        })

    })

    $(document).on('click', '.filter-submit', function (event) {
        event.preventDefault()
        let current_filters = {}
        $('.filter').each(function () {
            current_filters[$(this).data('val')] = $(this).val()
        })

        getMenu(current_filters)
    })

    $(document).on('click', '.page-link', function (event) {
        event.preventDefault()
        let current_pages = { 'page': $(this).html() }
        $('.page-item').removeClass('active')
        $(this).parent().addClass('active')
        getMenu(current_pages)
    })

    $(document).on('change', '#bid', function (event) {
        event.preventDefault()
        $.get($(this).data('val') + '?option=timetables_rooms&bid=' + $(this).val(), function (response) {
            response = JSON.parse(response)
            $('#rid').html(response.html)
        })
    })

    $(document).on('change', '#bid_f', function (event) {
        event.preventDefault()
        $.get($(this).data('val') + '?option=timetables_rooms&bid=' + $(this).val(), function (response) {
            response = JSON.parse(response)
            $('#rid_f').html(response.html)
        })
    })

    $(document).on('click', '.filter-reset', function () {
        $('.filter').val("")
        $('select.filter').prop('selectedIndex', 0)
        $('.filter-submit').click()
    })

    $(document).on('click', '.filter-export', function (event) {
        event.preventDefault()
        let timerInterval
        Swal.fire({
            title: 'Загрузка',
            html: 'Это займет <b></b> секунд.',
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                let query_str = ''
                let current_filters = {}
                $('.filter').each(function () {
                    query_str = query_str + '&' + $(this).data('val') + '=' + $(this).val()
                    current_filters[$(this).data('val')] = $(this).val()
                })

                window.location = 'excel?test=1' + query_str;

                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft() / 1000
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
    })

    $(document).on('click', '.room-link', function (event) {
        event.preventDefault()
        let timerInterval
        Swal.fire({
            title: 'Загрузка',
            html: 'Это займет <b></b> секунд.',
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                $.get('/user_modules?option=room_detail&rid=' + $(this).data('val'), function (response) {
                    response = JSON.parse(response)
                    Swal.fire({
                        title: '<strong>' + response.title + '</strong>',
                        icon: 'info',
                        html: response.html,
                        showCloseButton: true,
                        confirmButtonText: 'Понятно!'
                    })
                })

                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft() / 1000
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })

    })

    $('#close_btn').click(function () {
        $('.links').fadeOut(1000, function () { $('#show_btn').fadeIn() })
    })

    $('#show_btn').click(function () {
        $('.links').fadeIn(1000, () => { $('#show_btn').fadeOut() })
    })

    $(document).on('click', '#export_btn', function(event){
        event.preventDefault()
        let timerInterval
        Swal.fire({
            title: 'Загрузка',
            html: 'Это займет <b></b> секунд.',
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                document.location = $(this).attr('href')
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft() / 1000
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
        })
    })

})

