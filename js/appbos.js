/*
@version $Id$
@copyright Copyright (C) 2011 Abricos All rights reserved.
@license http://www.gnu.org/copyleft/gpl.html GNU/GPL, see LICENSE.php
*/

var Component = new Brick.Component();
Component.entryPoint = function(){
	var os = Brick.mod.bos;
	os.ApplicationManager.startupRegister(function(){
		Brick.ff('uprofile', 'viewer', function(){
			Brick.mod.uprofile.viewer.showUserPanelMethod = function(user){
				window.location.href = "#app=social/user/showProfilePanel/"+user.id+"/";
			};
		});
	});

};
