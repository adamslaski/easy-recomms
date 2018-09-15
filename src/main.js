import $ from 'jquery';
import * as Filmweb from 'filmweb-api';

function getRecommenadations() {
    $("span.text.under").each(async function( index ) {
        var title = $(this).children("span.title").first().text();
        var year = $(this).children("span.year").first().text();
        var recommValue;
        const query = title + ' ' + year;
        const cachedValue = await browser.storage.local.get(query);
        if (typeof cachedValue[query] != undefined && cachedValue[query] != null) {
            recommValue = cachedValue[query];
        } else  {
            const id = await Filmweb.search(query);
            recommValue = await Filmweb.getFilmUserRecommendation(id);
            var record = {};
            record[query] = recommValue;
            browser.storage.local.set(record);
        }
        if (typeof recommValue != 'undefined' && recommValue != null && recommValue != -1) {
            $(this).children("span.sep").after('<span>   ' + recommValue + '% </span><span class="sep">|</span>  ');
        }
        });
}

function login(credentials) {
    return Filmweb.login(credentials.login, credentials.password);
}

window.addEventListener("load", async function(event) {
    try {
        const credentials = await browser.storage.local.get(["login", "password"]);
        const loginResult = await login(credentials);
        if (loginResult.status == 'ok') {
            getRecommenadations();
        } else {
            console.error(loginResult.content);
        }
    } catch(e) {
        console.error(e);
    }
});
