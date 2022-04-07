/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
}).catch(e => console.error(e));

let currentZone: string;
let currentPopup: any;
var urlMusik = "https://www.youtube-nocookie.com/embed/36YnV9STBqc?autoplay=1";

var zoneMusik = "musik";

const config = [
    {
        zone: 'needHelp',
        message: 'Tutorial\nansehen?',
        cta: [
            {
                label: 'OK',
                className: 'primary',
                callback: () => {
				WA.nav.openTab('https://db-planet.deutschebahn.com/pages/telefonie/apps/content/workadventure-erste-schritte')
				closePopup()
				},
            }
        ]
    },
    {
        zone: 'followUs',
        message: 'Möchtest du ein Feedback geben?',
        cta: [
            
            {
                label: 'Nein',
                className: 'secondary',
                callback: () => closePopup(),
            },
			{
                label: 'Gerne',
                className: 'primary',
                callback: () => {
				WA.nav.openCoWebSite('https://forms.office.com/Pages/ResponsePage.aspx?id=nC2noeZJbU-a9lqvoRg7_f26WHDvlOFNi_8Y43fECOdUMDVDTUpUUDRONkxHMzdLQ09WRlQxUUZSMS4u')
				closePopup()
				},
            }
        ]
    },
    {
        zone: 'DBPlanet',
        message: 'DB Planet WorkAdventure',
        cta: [
            {
                label: 'OK',
                className: 'primary',
                callback: () => {
				WA.nav.openTab('https://db-planet.deutschebahn.com/pages/telefonie/apps/content/workadventure')
				closePopup()
				},
            }
        ]
    },
]


WA.room.onEnterZone('needHelp', () => {
    currentZone = 'needHelp'
    openPopup(currentZone, currentZone + 'Popup')
});
WA.room.onEnterZone('followUs', () => {
    currentZone = 'followUs'
    openPopup(currentZone, currentZone + 'Popup')
});
WA.room.onEnterZone('DBPlanet', () => {
    currentZone = 'DBPlanet'
    openPopup(currentZone, currentZone + 'Popup')
});
WA.room.onLeaveZone('needHelp', closePopup);
WA.room.onLeaveZone('followUs', () => { closePopup(); WA.nav.closeCoWebSite(); });
WA.room.onLeaveZone('DBPlanet', closePopup);

function openPopup(zoneName: string, popupName: string) {
    const zone = config.find((item) => {
        return item.zone == zoneName
    });
    if (typeof zone !== 'undefined') {
        // @ts-ignore otherwise we can't use zone.cta object
        currentPopup = WA.ui.openPopup(popupName, zone.message, zone.cta)
    }
}
function closePopup(){
    if (currentPopup !== undefined) {
		currentPopup.close();
        currentPopup = undefined;
    }
}