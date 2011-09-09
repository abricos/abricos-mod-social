/*
@version $Id: board.js 1010 2011-06-03 07:00:01Z roosit $
@package Abricos
@copyright Copyright (C) 2008 Abricos All rights reserved.
@license http://www.gnu.org/copyleft/gpl.html GNU/GPL, see LICENSE.php
*/

var Component = new Brick.Component();
Component.requires = {
	mod:[
		{name: 'sys', files: ['container.js']},
        {name: 'uprofile', files: ['viewer.js']},
        {name: 'social', files: ['lib.js']}
	]
};
Component.entryPoint = function(){

	var Dom = YAHOO.util.Dom,
		E = YAHOO.util.Event,
		L = YAHOO.lang;
	
	var NS = this.namespace, 
		TMG = this.template,
		API = NS.API,
		UP = Brick.mod.uprofile;
	

	var initCSS = false, buildTemplate = function(w, ts){
		if (!initCSS){
			Brick.util.CSS.update(Brick.util.CSS['social']['user']);
			delete Brick.util.CSS['social']['user'];
			initCSS = true;
		}
		w._TM = TMG.build(ts); w._T = w._TM.data; w._TId = w._TM.idManager;
	};
	
	var UserProfilePanel = function(userid){
		this.userid = userid;
		UserProfilePanel.superclass.constructor.call(this, {
			fixedcenter: true, width: '790px', height: '400px'
		});
	};
	YAHOO.extend(UserProfilePanel, Brick.widget.Panel, {
		initTemplate: function(){
			buildTemplate(this, 'panel,runm,rbirthday,rdescript,rlv,rdl');
			return this._TM.replace('panel', {
				'uid': this.userid
			});
		},
		onLoad: function(){
			var __self = this;
			UP.viewer.loadUserInfo(this.userid, function(user){
				__self.renderUserInfo(user);
			});
		},
		renderUserInfo: function(user){
			var isMyProfile = Brick.env.user.id*1 == user.id*1;
			
			var TM = this._TM, gel = function(nm){
				return TM.getEl('panel.'+nm);
			};
			
			Dom.setStyle(gel('wait'), 'display', 'none');
			Dom.setStyle(gel('id'), 'display', '');

			gel('foto').innerHTML = UP.avatar.get180(user);
			gel('fullname').innerHTML = UP.viewer.buildUserName(user);
			
			
			var lst = TM.replace('runm', {'value': user['unm']});
			
			if (user['birthday']*1>0){
				lst += TM.replace('rbirthday', {'value': NS.dateToString(NS.dateToClient(user['birthday']))});
			}
			if (L.isString(user['descript']) && user['descript'].length > 0){
				lst += TM.replace('rdescript', {'value': user['descript']});
			}
			if (user['dl']*1>0){
				lst += TM.replace('rdl', {'value': NS.dateToString(NS.dateToClient(user['dl']))});
			}
			lst += TM.replace('rlv', {
				'value': Brick.dateExt.convert(user['lv'])
			});
			
			gel('list').innerHTML = lst;
			
			isMyProfile = false;
			Dom.getElementsByClassName('_ismyprofile', '', gel('id'), function(el){
				Dom.setStyle(el, 'display', (isMyProfile ? '' : 'none'));
			});
			
		}
	});
	NS.UserProfilePanel = UserProfilePanel;
	
	API.showProfilePanel = function(userid){
		new UserProfilePanel(userid);
	};
};