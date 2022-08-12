// @ts-nocheck

const game = {
    input: document.getElementById('input'),
    eq: [],
    compass: ['NORTH', 'EAST', 'SOUTH', 'WEST'],

    map: {
        width: 7, height: 6,
        map: [],
        locations: [,
            [, 11, 12, 13, 14, 15, 16, 17],
            [, 21, 22, 23, 24, 25, 26, 27],
            [, 31, 32, 33, 34, 35, 36, 37],
            [, 41, 42, 43, 44, 45, 46, 47],
            [, null, null, null, 54, 55, 56, 57],
            [, null, null, null, 64, 65, 66, 67],
        ],
        dragonKilled: false,

        renderUserMap: function (defaultX, defaultY) {
            for (let x = 1; x <= this.height; x++) {
                game.map.map[x] = []
                for (let y = 1; y <= this.width; y++) {
                    game.map.map[x][y] = 0
                }
            }

            let avbLocations = []
            for (let i = 0; i < 4; i++) {
                if (locationsData[defaultX][defaultY].lock.charAt(i) == 1) avbLocations.push(game.compass[i]);
            }
            //render default scene
            game.map.map[defaultX][defaultY] = 1
            game.scene.renderScene(defaultX, defaultY, avbLocations, locationsData[defaultX][defaultY].lock)
            console.table(game.map.map)
        }
    },

    scene: {
        location: document.getElementById('locationElement'),
        locationDesc: document.getElementById('locationDescElement'),
        locationImage: document.getElementById('locationImage'),
        compass: document.getElementById('compassElement'),
        compassImg: document.getElementById('compass'),
        userEquipment: document.getElementById('userEquipmentElement'),
        alertHandler: document.getElementById('alertHandler'),
        alert: "You can't go that way!",

        renderScene: function (x, y, avbLoc, loc) {
            this.location.innerHTML = locationsData[x][y].name;
            this.locationImage.src = './assets/img/' + game.map.locations[x][y] + '.gif';
            this.locationImage.style.backgroundColor = locationsData[x][y].color;
            if (locationsData[x][y].items.length > 0) this.locationDesc.innerHTML = `You see ${locationsData[x][y].items}`;
            if (locationsData[x][y].items.length == 0) this.locationDesc.innerHTML = `You see ${'nothing'}`;
            this.compass.innerHTML = `You can go ${avbLoc}` + ` or CLEAR the input`;
            this.compassImg.src = './assets/img/compass/' + loc + '.png';
            if (game.eq.length > 0) { this.userEquipment.innerHTML = `You are carrying ${game.eq}`; } else {
                this.userEquipment.innerHTML = `You are carrying nothing`;
            }

        },

        placeItem: function (ind, x, y) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].index == ind) {
                    console.log(ind, x, y)
                    locationsData[x][y].items.push(items[i].name)
                    console.log(locationsData[x][y].items)
                }
            }
        },

        renderItems: function () {
            this.placeItem(31, 1, 3)
            this.placeItem(27, 1, 5)
            this.placeItem(14, 1, 7)
            this.placeItem(10, 2, 3)
            this.placeItem(18, 2, 7)
            this.placeItem(32, 3, 2)
            this.placeItem(21, 4, 4)
            this.placeItem(33, 5, 5)
            this.placeItem(24, 6, 4)
        },

        renderDragon: function () {

        },

        stalkingUserInput: (e) => {
            if (e.keyCode == 13) {

                document.getElementById('klik').play()

                alertHandler.innerHTML = '';
                let x = 0; let y = 0;

                for (let i = 1; i <= game.map.height; i++) {
                    for (let j = 1; j <= game.map.width; j++) {
                        if (game.map.map[i][j] == 1) {
                            x = i;
                            y = j;
                        }
                    }
                }

                let lock = locationsData[x][y].lock; //nesw: 1111, 0000                        
                console.log(lock)

                let commands = input.value.split(' ');

                switch (commands[0]) {
                    case 'E':
                    case 'EAST':
                        if (lock.charAt(1) == 1 && game.map.locations[x][y + 1] != null && y + 1 <= game.map.width) {

                            if (x == 4 && y + 1 == 7) {

                                game.scene.alertHandler.innerHTML = `You are going back home..`
                                setTimeout(() => {
                                    game.scene.alertHandler.innerHTML = `Are you ready to see your wife?`
                                }, 2000);

                            }

                            let avbLocations = []
                            for (let i = 0; i < 4; i++) {
                                if (locationsData[x][y + 1].lock.charAt(i) == 1) avbLocations.push(game.compass[i]);
                            }

                            game.scene.renderScene(x, y + 1, avbLocations, locationsData[x][y + 1].lock)
                            game.map.map[x][y] = 0;
                            game.map.map[x][y + 1] = 1;

                            game.scene.alertHandler.innerHTML = `You are going east...`



                        } else {
                            game.scene.alertHandler.innerHTML = game.scene.alert
                        }
                        break;
                    case 'W':
                    case 'WEST':
                        if (lock.charAt(3) == 1 && game.map.locations[x][y - 1] != null && y - 1 >= 1) {

                            if (x == 4 && y - 1 == 1) {
                                document.getElementById('hejnal').play()
                            }

                            if (x == 4 && y - 1 == 2) {
                                game.scene.alertHandler.innerHTML = `You can't go that way...`
                                setTimeout(() => {
                                    game.scene.alertHandler.innerHTML = `The dragon sleeps in a cave!`
                                }, 2000);
                            } else {
                                let avbLocations = []
                                for (let i = 0; i < 4; i++) {
                                    if (locationsData[x][y - 1].lock.charAt(i) == 1) avbLocations.push(game.compass[i]);
                                }
                                game.scene.renderScene(x, y - 1, avbLocations, locationsData[x][y - 1].lock)
                                game.map.map[x][y] = 0;
                                game.map.map[x][y - 1] = 1;

                                game.scene.alertHandler.innerHTML = `You are going west...`
                            }

                        } else {
                            game.scene.alertHandler.innerHTML = game.scene.alert
                        }
                        break;
                    case 'N':
                    case 'NORTH':
                        if (lock.charAt(0) == 1 && game.map.locations[x - 1][y] != null && x - 1 >= 1) {

                            let avbLocations = []
                            for (let i = 0; i < 4; i++) {
                                if (locationsData[x - 1][y].lock.charAt(i) == 1) avbLocations.push(game.compass[i]);
                            }

                            game.scene.renderScene(x - 1, y, avbLocations, locationsData[x - 1][y].lock)
                            game.map.map[x][y] = 0;
                            game.map.map[x - 1][y] = 1;

                            game.scene.alertHandler.innerHTML = `You are going north...`

                        } else {
                            game.scene.alertHandler.innerHTML = game.scene.alert
                        }
                        break;
                    case 'S':
                    case 'SOUTH':
                        if (lock.charAt(2) == 1 && game.map.locations[x + 1][y] != null && x + 1 <= game.map.height) {

                            let avbLocations = []
                            for (let i = 0; i < 4; i++) {
                                if (locationsData[x + 1][y].lock.charAt(i) == 1) avbLocations.push(game.compass[i]);
                            }

                            game.scene.renderScene(x + 1, y, avbLocations, locationsData[x + 1][y].lock)
                            game.map.map[x][y] = 0;
                            game.map.map[x + 1][y] = 1;

                            game.scene.alertHandler.innerHTML = `You are going south...`

                        } else {
                            game.scene.alertHandler.innerHTML = game.scene.alert
                        }
                        break;
                    case 'U':
                    case 'USE':

                        function getItemIndex(name) {
                            for (let i = 0; i < items.length; i++) {
                                if (items[i].name == name) {
                                    return items[i].index;
                                }
                            }
                        }

                        function useItem(ind, desX, desY) {
                            if (game.eq.includes(commands[1])) {
                                if (getItemIndex(commands[1]) == ind) {
                                    if (x == desX && y == desY) {

                                    }
                                }
                            }
                        }

                        game.scene.alertHandler.innerHTML = `The module 'USE' is in development.` + `<br/>` + `The game is currently available only as DEMO.`

                        if (game.eq.length > 0) { game.scene.userEquipment.innerHTML = `You are carrying ${game.eq}`; } else {
                            game.scene.userEquipment.innerHTML = `You are carrying nothing`;
                        }

                        if (locationsData[x][y].items.length > 0) this.locationDesc.innerHTML = `You see ${locationsData[x][y].items}`;
                        if (locationsData[x][y].items.length == 0) this.locationDesc.innerHTML = `You see ${'nothing'}`;
                        if (game.eq.length > 0) { game.scene.userEquipment.innerHTML = `You are carrying ${game.eq}`; } else {
                            game.scene.userEquipment.innerHTML = `You are carrying nothing`;
                        }

                        break;

                    case 'T':
                    case 'TAKE':

                        if (locationsData[x][y].items.includes(commands[1])) {
                            if (game.eq.length < 3) {
                                for (let i = 0; i < items.length; i++) {
                                    if (items[i].name == commands[1]) {
                                        if (items[i].usable) {
                                            game.eq.push(commands[1]);
                                            let index = locationsData[x][y].items.indexOf(commands[1]);
                                            locationsData[x][y].items.splice(index, 1)
                                            game.scene.userEquipment.innerHTML = `You are carrying ${game.eq}`;
                                            game.scene.alertHandler.innerHTML = `You are taking ${commands[1]}`;

                                            if (locationsData[x][y].items.length > 0) game.scene.locationDesc.innerHTML = `You see ${locationsData[x][y].items}`;
                                            if (locationsData[x][y].items.length == 0) game.scene.locationDesc.innerHTML = `You see ${'nothing'}`;
                                        } else {
                                            game.scene.alertHandler.innerHTML = `You can't carry it`;
                                        }
                                    }
                                }
                            } else {
                                game.scene.alertHandler.innerHTML = `The inventory is full. Drop something first`;
                            }
                        } else {
                            game.scene.alertHandler.innerHTML = `There isn't anything like that here`;
                        }
                        break;

                    case 'D':
                    case 'DROP':
                        if (game.eq.length > 0) {
                            if (game.eq.includes(commands[1])) {
                                locationsData[x][y].items.push(commands[1])
                                let index = game.eq.indexOf(commands[1]);
                                game.eq.splice(index, 1)

                                game.scene.userEquipment.innerHTML = `You are carrying ${game.eq}`;
                                game.scene.alertHandler.innerHTML = `You dropped ${commands[1]}`;

                                if (locationsData[x][y].items.length > 0) game.scene.locationDesc.innerHTML = `You see ${locationsData[x][y].items}`;
                                if (locationsData[x][y].items.length == 0) game.scene.locationDesc.innerHTML = `You see ${'nothing'}`;
                            } else {
                                game.scene.alertHandler.innerHTML = `You are not carrying ${commands[1]} in your inventory.`;
                            }
                        } else {
                            game.scene.alertHandler.innerHTML = `You are not carrying anything`;
                        }
                        if (game.eq.length > 0) { game.scene.userEquipment.innerHTML = `You are carrying ${game.eq}`; } else {
                            game.scene.userEquipment.innerHTML = `You are carrying nothing`;
                        }
                        break;

                    case 'V':
                    case 'VOCABULARY':
                        game.scene.alertHandler.innerHTML = `NORTH or N, SOUTH or S, WEST or W, EAST or E` + '<br/>' +
                            `TAKE(object) or T(object)` + '<br/>' +
                            `DROP(object) or D(object)` + '<br/>' +
                            `USE(object) or U(object)` + '<br/>' +
                            `GOSSIPS or G, VOCABULARY or V` + '<br/>' +
                            `Press any key`
                        break;

                    case 'G':
                    case 'GOSSIPS':
                        game.scene.alertHandler.innerHTML = "The  woodcutter lost  his home key..."
                        "The butcher likes fruit... The cooper" + '<br/>' +
                            "is greedy... Dratewka plans to make a" + '<br/>' +
                            "poisoned  bait for the dragon...  The" + '<br/>' +
                            "tavern owner is buying food  from the" + '<br/>' +
                            "pickers... Making a rag from a bag..." + '<br/>' +
                            "Press any key"
                        break;

                    case 'CLEAR':
                        input.value = ''
                        input.style.color = 'white'
                        break;
                    default:
                        game.scene.alertHandler.innerHTML = `Try another word or V for vocabulary`
                }



                console.table(game.map.map);

            }

        }

    }

}

const locationsData = [,
    [
        ,
        { 'name': 'You are inside a brimstone mine', 'color': 'rgb(235,211,64)', 'lock': '0100', 'items': [] },
        { 'name': 'You are at the entrance to the mine', 'color': 'rgb(89,93,87)', 'lock': '0101', 'items': [] },
        { 'name': 'A hill', 'color': 'rgb(117,237,243)', 'lock': '0111', 'items': [] },
        { 'name': 'Some bushes', 'color': 'rgb(202,230,51)', 'lock': '0101', 'items': [] },
        { 'name': 'An old deserted hut', 'color': 'rgb(220,204,61)', 'lock': '0101', 'items': [] },
        { 'name': 'The edge of a forest', 'color': 'rgb(167,245,63)', 'lock': '0101', 'items': [] },
        { 'name': 'A dark forest', 'color': 'rgb(140,253,99)', 'lock': '0011', 'items': [] }
    ],
    [
        ,
        { 'name': 'A man nearby making tar', 'color': 'rgb(255,190,99)', 'lock': '0110', 'items': [] },
        { 'name': 'A timber yard', 'color': 'rgb(255,190,99)', 'lock': '0111', 'items': [] },
        { 'name': 'You are by a roadside shrine', 'color': 'rgb(167,245,63)', 'lock': '1111', 'items': [] },
        { 'name': 'You are by a small chapel', 'color': 'rgb(212,229,36)', 'lock': '0101', 'items': [] },
        { 'name': 'ou are on a road leading to a wood', 'color': 'rgb(167,245,63)', 'lock': '0111', 'items': [] },
        { 'name': 'You are in a forest', 'color': 'rgb(167,245,63)', 'lock': '0101', 'items': [] },
        { 'name': 'You are in a deep forest', 'color': 'rgb(140,253,99)', 'lock': '1001', 'items': [] }
    ],
    [
        ,
        { 'name': 'You are by the Vistula River', 'color': 'rgb(122,232,252)', 'lock': '1100', 'items': [] },
        { 'name': 'You are by the Vistula River', 'color': 'rgb(140,214,255)', 'lock': '1001', 'items': [] },
        { 'name': 'A hill', 'color': 'rgb(108,181,242)', 'lock': '1010', 'items': [] },
        { 'name': 'Some bushes', 'color': 'rgb(255,189,117)', 'lock': '0100', 'items': [] },
        { 'name': 'An old deserted hut', 'color': 'rgb(255,190,99)', 'lock': '1011', 'items': [] },
        { 'name': `You are in a butcher's shop`, 'color': 'rgb(255, 188, 102)', 'lock': '0010', 'items': [] },
        { 'name': `You are in a cooper's house`, 'color': 'rgb(255, 188, 102)', 'lock': '0010', 'items': [] }
    ],
    [
        ,
        { 'name': 'You are in the Wawel Castle', 'color': 'rgb(255,176,141)', 'lock': '0100', 'items': [] },
        { 'name': `You are inside a dragon's cave`, 'color': 'rgb(198,205,193)', 'lock': '0101', 'items': [] },
        { 'name': 'A perfect place to set a trap', 'color': 'rgb(255,176,141)', 'lock': '1001', 'items': [] },
        { 'name': 'You are by the water mill', 'color': 'rgb(255,190,99)', 'lock': '0100', 'items': [] },
        { 'name': 'You are at a main crossroad', 'color': 'rgb(255,190,99)', 'lock': '1111', 'items': [] },
        { 'name': 'You are on a town street', 'color': 'rgb(255,190,99)', 'lock': '1101', 'items': [] },
        { 'name': 'You are in a frontyard of your house', 'color': 'rgb(255,190,99)', 'lock': '1011', 'items': [] }
    ],
    [
        ,
        {},
        {},
        {},
        { 'name': 'You are by a swift stream', 'color': 'rgb(108,181,242)', 'lock': '0100', 'items': [] },
        { 'name': 'You are on a street leading forest', 'color': 'rgb(255,190,99)', 'lock': '1011', 'items': [] },
        { 'name': `You are in a woodcutter's backyard`, 'color': 'rgb(255,190,99)', 'lock': '0010', 'items': [] },
        { 'name': `You are in a shoemaker's house`, 'color': 'rgb(254,194,97)', 'lock': '1000', 'items': [] }
    ],
    [
        ,
        {},
        {},
        {},
        { 'name': 'You are in a bleak funeral house', 'color': 'rgb(254,194,97)', 'lock': '0100', 'items': [] },
        { 'name': 'You are on a path leading to the wood', 'color': 'rgb(167,245,63)', 'lock': '1101', 'items': [] },
        { 'name': 'You are at the edge of a forest', 'color': 'rgb(167,245,63)', 'lock': '1101', 'items': [] },
        { 'name': 'You are in a deep forest', 'color': 'rgb(140,253,99)', 'lock': '0001', 'items': [] }
    ]
]

const items = [
    { 'index': 10, 'desc': 'a KEY', 'usable': true, 'name': 'KEY' },
    { 'index': 11, 'desc': 'an AXE', 'usable': true, 'name': 'AXE' },
    { 'index': 12, 'desc': 'STICKS', 'usable': true, 'name': 'STICKS' },
    { 'index': 13, 'desc': 'sheeplegs', 'usable': false, 'name': 'sheeplegs' },
    { 'index': 14, 'desc': 'MUSHROOMS', 'usable': true, 'name': 'MUSHROOMS' },
    { 'index': 15, 'desc': 'MONEY', 'usable': true, 'name': 'MONEY' },
    { 'index': 16, 'desc': 'a BARREL', 'usable': true, 'name': 'BARREL' },
    { 'index': 17, 'desc': 'a sheeptrunk', 'usable': false, 'name': 'sheeptrunk' },
    { 'index': 18, 'desc': 'BERRIES', 'usable': true, 'name': 'BERRIES' },
    { 'index': 19, 'desc': 'WOOL', 'usable': true, 'name': 'WOOL' },
    { 'index': 20, 'desc': 'a sheepskin', 'usable': false, 'name': 'sheepskin' },
    { 'index': 21, 'desc': 'a BAG', 'usable': true, 'name': 'BAG' },
    { 'index': 22, 'desc': 'a RAG', 'usable': true, 'name': 'RAG' },
    { 'index': 23, 'desc': 'a sheephead', 'usable': false, 'name': 'sheephead' },
    { 'index': 24, 'desc': 'a SPADE', 'usable': true, 'name': 'SPADE' },
    { 'index': 25, 'desc': 'SULPHUR', 'usable': true, 'name': 'SULPHUR' },
    { 'index': 26, 'desc': 'a solid poison', 'usable': false, 'name': 'solid poison' },
    { 'index': 27, 'desc': 'a BUCKET', 'usable': true, 'name': 'BUCKET' },
    { 'index': 28, 'desc': 'TAR', 'usable': true, 'name': 'TAR' },
    { 'index': 29, 'desc': 'a liquid poison', 'usable': false, 'name': 'liquid poison' },
    { 'index': 30, 'desc': 'a dead dragon', 'usable': false, 'name': 'dead dragon' },
    { 'index': 31, 'desc': 'a STONE', 'usable': true, 'name': 'STONE' },
    { 'index': 32, 'desc': 'a FISH', 'usable': true, 'name': 'FISH' },
    { 'index': 33, 'desc': 'a KNIFE', 'usable': true, 'name': 'KNIFE' },
    { 'index': 34, 'desc': 'a DRAGONSKIN', 'usable': true, 'name': 'DRAGONSKIN' },
    { 'index': 35, 'desc': 'a dragonskin SHOES', 'usable': true, 'name': 'SHOES' },
    { 'index': 36, 'desc': 'a PRIZE', 'usable': true, 'name': 'PRIZE' },
    { 'index': 37, 'desc': 'a SHEEP', 'usable': true, 'name': 'SHEEP' }
]


document.getElementById('play').onclick = function () {
    document.getElementById('hejnal').play()
    console.log('hejnal')
    document.getElementById('play').style.display = 'none';
    setTimeout(() => {
        document.getElementById('i0').style.display = 'none';
        setTimeout(() => {
            document.getElementById('i1').style.display = 'none';
            setTimeout(() => {
                document.getElementById('i2').style.display = 'none';
                setTimeout(() => {
                    document.getElementById('i3').style.display = 'none';
                }, 4000);
            }, 4000);
        }, 4000);
    }, 4000);
}







input.onkeydown = game.scene.stalkingUserInput;
game.scene.renderItems()
game.map.renderUserMap(4, 7);