const dialogueData = {

    old_man_01: [

        {
            speaker:
                "灰袍老者",

            text:
                "……你還記得自己的名字嗎？"

        },

        {
            speaker:
                "灰袍老者",

            text:
                "不記得也好。這片荒原最喜歡吞掉名字。"

        },

        {
            speaker:
                "灰袍老者",

            text:
                "如果你想知道自己曾經是誰，就往忘川走吧。"

        }

    ],


    blacksmith_01: [

        {
            speaker:
                "未知的聲音",

            text:
                "火……鐵……還有一雙正在顫抖的手。"

        },

        {
            speaker:
                "未知的聲音",

            text:
                "你曾經打造過某樣東西。"

        },

        {
            speaker:
                "未知的聲音",

            text:
                "但你已經忘了它是為誰打造的。"

        }

    ],


    river_01: [

        {
            speaker:
                "忘川",

            text:
                "不要看水面。"

        },

        {
            speaker:
                "忘川",

            text:
                "那裡映出的不是你的臉。"

        },

        {
            speaker:
                "忘川",

            text:
                "而是你不願承認的那一世。"

        }

    ]

};


export class Dialogue {

    constructor() {

        this.active =
            false;

        this.id =
            null;

        this.index =
            0;

    }


    start(id) {

        if (
            !dialogueData[id]
        ) {

            return;

        }

        this.active =
            true;

        this.id =
            id;

        this.index =
            0;

        this.render();

    }


    next() {

        if (!this.active)
            return;

        const lines =
            dialogueData[
                this.id
            ];


        this.index++;


        if (
            this.index >=
            lines.length
        ) {

            this.active =
                false;

            document.getElementById(
                "dialogue"
            ).style.display =
                "none";

            return;

        }


        this.render();

    }


    render() {

        const lines =
            dialogueData[
                this.id
            ];

        const line =
            lines[
                this.index
            ];


        document.getElementById(
            "dialogue"
        ).style.display =
            "block";


        document.getElementById(
            "dialogue-speaker"
        ).textContent =
            line.speaker;


        document.getElementById(
            "dialogue-text"
        ).textContent =
            line.text;

    }

}