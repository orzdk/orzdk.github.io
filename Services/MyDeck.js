deckbuilder.service('MyDeck', function () {
    var deck = [];

    return {
	
        getDeck: function () {
            return deck;
        },
        setDeck: function(value) {
            deck = value;
        },
        addCard: function(card){
            deck.push(card);
        },
        removeCard: function(card){
            deck.splice(deck.indexOf(card), 1);
        }
    }
		
});

deckbuilder.service('MyCards', function () {
    var cards = [];

    return {
    
        getCards: function () {
            return cards;
        },
        setCards: function(value) {
            cards = value;
        },
        addCard: function(card){
            cards.push(card);
        },
        removeCard: function(card){
            cards.splice(cards.indexOf(card), 1);
        }
    }
        
});