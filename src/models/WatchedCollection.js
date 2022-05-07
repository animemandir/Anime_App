import {CardItem} from "@/models/CardItems"

export default function WatchedCollection(){
    let arr = [];

    arr.addItem = function (item){
        this.push(new CardItem(item, (collection =>
                    function(){
                        collection.removeItem(this);
                    }
            )(this)
        ));
    }

    arr.removeItem = function (item){
        this.splice(this.indexOf(item), 1);

        return this;
    }

    return arr;
}