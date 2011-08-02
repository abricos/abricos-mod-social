<?php 
/**
 * Модуль Social
 * 
 * @version $Id: module.php 913 2011-02-28 07:09:11Z roosit $
 * @package Abricos 
 * @subpackage Social
 * @copyright Copyright (C) 2011 Abricos All rights reserved.
 * @license http://www.gnu.org/copyleft/gpl.html GNU/GPL, see LICENSE.php
 * @author Alexander Kuzmin (roosit@abricos.org)
 */

class SocialModule extends CMSModule {
	
	/**
	 * Конструктор
	 */
	public function __construct(){
		// Версия модуля
		$this->version = "0.1";
		
		// Название модуля
		$this->name = "social";
	}
}

$mod = new SocialModule();
CMSRegistry::$instance->modules->Register($mod);

?>