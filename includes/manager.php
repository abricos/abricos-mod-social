<?php
/**
 * @version $Id$
 * @package Abricos
 * @subpackage Bodraw
 * @copyright Copyright (C) 2008 Abricos. All rights reserved.
 * @license http://www.gnu.org/copyleft/gpl.html GNU/GPL, see LICENSE.php
 * @author Alexander Kuzmin (roosit@abricos.org)
 */

require_once('dbquery.php');

class SocialManager extends Ab_ModuleManager {
	
	/**
	 * @var SocialModule
	 */
	public $module = null;
	
	/**
	 * @var SocialManager
	 */
	public static $instance = null; 
	
	public function __construct(SocialModule $module){
		parent::__construct($module);
		
		SocialManager::$instance = $this;
	}
	
	private function _AJAX($modname, $data){
		$module = Abricos::GetModule($modname);
		if (empty($module)){ 
			return null; 
		}
		$manager = $module->GetManager();
		return $manager->AJAX($data);
	}
	
	public function AJAX($d){
		switch($d->do){
			case 'saveprofile': return $this->SaveProfile($d->userid, $d->data);
		}
		return null;
	}
	
	public function SaveProfile($userid, $d){
		if ($this->userid != $userid){ return null; }
		
		$utmf = Abricos::TextParser(true);
		$d->userid = $userid;
		$d->firstname = $utmf->Parser($d->firstname);
		$d->lastname = $utmf->Parser($d->lastname);
		$d->site = $utmf->Parser($d->site);
		$d->descript = $utmf->Parser($d->descript);
		$d->sex = intval($d->sex);
		$d->birthday = intval($d->birthday);
		SocialQuery::UserProfileUpdate($this->db, $userid, $d);
		
		return $d;
	}
}

?>