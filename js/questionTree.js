(function( $ ) {
    var settings;
    var currentNode;
    var treeNodes;
    var prevNodes = [];

    
    // Plugin definition.
    $.fn.questionTree = function( options ) {
        var elem = $( this );
        settings = $.extend( {}, $.fn.questionTree.defaults, options );
        treeNodes = elem.children('.'+settings.nodeClass);
        treeNodes.each(function(index){
            $(this).addClass('tree-node' + index);
            if(settings.backButton && index>0){
                $(this).append('<div class="back-button-wrapper"><'+settings.backButtonElement+' class="back-button">'+settings.backButtonLabel+'</'+settings.backButtonElement+'></div>');
                $(this).find('.back-button').on('click', function(e){
                    e.preventDefault();
                    prevNode();
                });
            }
        });
        elem.addClass(settings.containerClass);
        

        currentNode = $('.'+settings.nodeClass).first();
        //showNode(currentNode);
        elem.children(treeNodes).each(function(e){
            console.log($(this));
            if(e==0){
                showNode($(this), true);
            }else{
                hideNode($(this));
            }
        });

        treeNodes.children('[destination]').on('click', function(e){
                e.preventDefault();
                var destination = $(this).attr('destination');
                var nextNode = elem.find('.'+settings.nodeClass+destination);
                showNode(nextNode);
        });
        treeNodes.children('[destinationFor]').on('change', function(e){
                var destination = $(this).val();
                
                var destinationFor = $(this).attr('destinationFor');
                console.log($('#'+destinationFor));
                $('#'+destinationFor).attr('destination', destination);
        });
        return this;
    };
    
    
    $.fn.questionTree.defaults = {
        containerClass: "container-tree",
        nodeClass: "tree-node",
        backButton: true,
        backButtonElement: "button",
        backButtonLabel: "Back",
        showAnimation: function(){$(this).show();},
        hideAnimation: function(){$(this).hide();},
    };
    function prevNode(){
        var prevNode = prevNodes[(prevNodes.length)-2];
        prevNodes.pop();
        prevNodes.pop();
        showNode(prevNode);
    }
    function showNode(node, first){
        if(first == undefined || first==false){
            hideNode(currentNode);
        }
        currentNode = node;
        prevNodes.push(currentNode);
        node.showAnimation=settings.showAnimation;
        node.showAnimation();
    }
    function hideNode(node){
        node.hideAnimation=settings.hideAnimation;
        node.hideAnimation();
    }
 
// End of closure.
 
})( jQuery );