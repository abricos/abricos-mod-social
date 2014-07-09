<?php
/**
 * @version $Id$
 * @package Abricos
 * @subpackage Bodraw
 * @copyright Copyright (C) 2008 Abricos. All rights reserved.
 * @author Alexander Kuzmin (roosit@abricos.org)
 */

class SocialQuery {

	public static function UserProfileUpdate(Ab_Database $db, $userid, $d){
		$sql = "
			UPDATE ".$db->prefix."user
			SET
				firstname='".bkstr($d->firstname)."',
				lastname='".bkstr($d->lastname)."',
				site='".bkstr($d->site)."',
				descript='".bkstr($d->descript)."',
				sex=".bkint($d->sex).",
				birthday=".bkint($d->birthday)."
			WHERE userid=".bkint($userid)."
		";
		$db->query_write($sql);
	}
	
}

?>