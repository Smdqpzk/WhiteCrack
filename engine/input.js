export class Input {

    constructor() {

        this.keys = {};

        this.previous = {};

        this.listeners = {};

        window.addEventListener(
            "keydown",
            e => {

                const key =
                    e.key.toLowerCase();

                this.keys[key] = true;

                if (
                    !this.previous[key]
                ) {

                    if (
                        this.listeners[key]
                    ) {

                        for (
                            const fn
                            of this.listeners[key]
                        ) {

                            fn();

                        }

                    }

                }

                this.previous[key] = true;

            }
        );


        window.addEventListener(
            "keyup",
            e => {

                const key =
                    e.key.toLowerCase();

                this.keys[key] = false;

                this.previous[key] = false;

            }
        );

    }


    isDown(key) {

        return !!this.keys[
            key.toLowerCase()
        ];

    }


    onPress(key, callback) {

        key =
            key.toLowerCase();

        if (
            !this.listeners[key]
        ) {

            this.listeners[key] = [];

        }

        this.listeners[key].push(
            callback
        );

    }

}