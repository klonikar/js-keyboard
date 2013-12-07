
var Messenger = function(appId, userId, messenger){
	this.appId = appId;
	this.userId = userId;
	this.messenger = messenger;
};

Messenger.prototype = (function(){
	var seq = 0;
	var messageCallbacks = [];
	var host = 'http://turnwhole-dr.eglbp.corp.yahoo.com:8081';
	var listeningForNotifications = false;
	
	var handleSeq = function(obj){
		if(obj && obj.sequence && obj.sequence > seq)
			seq =  obj.sequence ;
	};
	
	var handleNotification = function(notifications){
		if(!notifications)
			return;
		
		var responses = notifications.responses;
		if(!responses)
			return;
			
		for (var i = 0; i < responses.length; i++) {
			var oneResponse = responses[i];
			
			for (var key in oneResponse) {
			  if (oneResponse.hasOwnProperty(key)) { 
				handleSeq(oneResponse[key]);
			  }
			}
			
		
			if(oneResponse.message){
				var message = oneResponse.message;
				handleSeq(message);
				for(var j=0; j<messageCallbacks.length; j++){
					try{
						var callback = messageCallbacks[j];
						callback({
							msg : message.msg ,
							sender : message.sender
						});
					}
					catch(e){console.log(e);}//catch error, we need to process additional message
				}
			}
			else if(oneResponse.buddyInfo){
				var buddyResponse = oneResponse.buddyInfo;
			}
			else if(oneResponse.buddyStatus){
				var buddyStatus = oneResponse.buddyStatus;
			}
		}
		
		if(responses && responses.length>0){
			seq++;
		}
	};
	
	var makeRequest = function(obj, url, params, callback){
		if(params){
			params['appId'] = obj.appId;
			params['userId'] = obj.userId;
		}
		else{
			params = {
				appId : obj.appId,
				userId : obj.userId
			}
		}
	
		$.ajax({
		  type: "POST",
		  url: host + url,
		  data: params,
		  success: function(res){callback(res);}
		});
		
	};
	
	return{
		constructor : Messenger,
		setSeq : function(newSeq){
			seq = newSeq;
		},
		
		linkUser : function(options){
			var params = false;
			if(options.username){
				params = {username : options.username, password: options.password};
				makeRequest(this, '/link', params, function(res){
					if(options && options.success){
						options.success({success:true});
					}
				});
			}
			else{ 
				var url  = host + '/token?appId=' + this.appId + '&userId=' + this.userId;
				var win = window.open( url,"_oauthtoken", "height=500,width=500,modal=yes,alwaysRaised=yes");
				var check_connect = setInterval(function(){
			        if ( win != null ) {
			          if( win.closed ){
			              clear(check_connect);
			              if(options && options.success){
							options.success({success:true});
						  }
			            }
			        }
			      }, 100);

			      function clear(it){ clearInterval(it);}
			}
		
			
			
		},
		
		getContacts  : function(callback){
			var that = this;
			if(!callback) return;
			
			makeRequest(this, '/contacts', {messenger: this.messenger /*, sessionObj : this.sessionObj*/}, function(res){
				callback(res);
			});
		},
		
		onMessage : function(callback){
			if(! listeningForNotifications){
				this.listenForNotifications();
			}
			messageCallbacks.push(callback);
		},
		
		isLinked : function(){},
		login : function(options){
			var that = this;
			makeRequest(this, '/login', {messenger: this.messenger}, function(res){
				if(res){
					that.sessionObj = res;
				}
				
				if(options && options.success){
					options.success({success:true});
				}
				
			});
		},
		
		listenForNotifications : function(){
			listeningForNotifications = true; //just listen for notifications once.
			var that = this;
			this.notify(function(){
				setTimeout(function(){
					that.listenForNotifications();
				}, 200);
			})
		},
		
		notify : function(callback){
			/*if(! this.sessionObj){
				return;
			}*/
			
			
			makeRequest(this, '/notifications', {"seq" : seq/*, sessionObj : this.sessionObj*/}, function(res){
				handleNotification(res);
				/*if(res.setSequenceTo){
					seq = res.setSequenceTo;
				}*/
				
				if(callback){
					callback({success:true});
				}
			});
		},
		
		logout : function(){},
		
		chatbox : function(user){
			if(! ChatBox){
				alert("Include messengerjs-ui.js");
			}
			
			return new ChatBox(this, user);
		},
		sendMessage : function(options){
			if(!(options) || !(options.message) || !(options.to)){
				throw "options.message and options.to is mandatory";
			}
			
			/*
			if(! this.sessionObj){
				alert("You're not logged in");
				return;
			}
			*/
			
			makeRequest(this, '/message', {message : options.message, to: options.to /*, sessionObj : this.sessionObj*/}, function(res){
				if(options.success){
					options.success({success:true});
				}
			});
		}
	}
})();





