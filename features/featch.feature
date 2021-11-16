Feature: Booking ticket
    Scenario: Should booking 1 ticket
        Given user is on 'http://qamid.tmweb.ru/client/index.php' page
        When user choose day '.page-nav > a:nth-child(2)'
        When user choose time 'a.movie-seances__time'
        When user choose chair '.buying-scheme__row > span:nth-child(1)'
        When user click booking 'button.acceptin-button'
        When user click for qr! 'button.acceptin-button'
        Then user sees the qr text 'Покажите QR-код нашему контроллеру для подтверждения бронирования.'

    Scenario: Should booking 2 tickets
        Given user is on 'http://qamid.tmweb.ru/client/index.php' page
        When user choose day '.page-nav > a:nth-child(3)'
        When user choose time 'a.movie-seances__time'
        When user choose chair '.buying-scheme__row > span:nth-child(1)'
        When user choose chair '.buying-scheme__row > span:nth-child(2)'
        When user click booking 'button.acceptin-button'
        When user click for qr! 'button.acceptin-button'
        Then user sees the qr text 'Покажите QR-код нашему контроллеру для подтверждения бронирования.'

    Scenario: Should not booking ticket
        Given user is on 'http://qamid.tmweb.ru/client/index.php' page
        When user choose day '.page-nav > a:nth-child(2)'
        When user choose time 'a.movie-seances__time'
        When user choose chair '.buying-scheme__row > span:nth-child(2)'
        When user click booking 'button.acceptin-button'
        When user click for qr! 'button.acceptin-button'
        When user sees the qr text first time 'Покажите QR-код нашему контроллеру для подтверждения бронирования.'
        When user go on 'http://qamid.tmweb.ru/client/index.php' page
        When user choose day '.page-nav > a:nth-child(2)'
        When user choose time 'a.movie-seances__time'
        When user choose chair '.buying-scheme__row > span:nth-child(2)'
        Then booking button disabled 'true'