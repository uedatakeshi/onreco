<?php
$data = json_decode($_POST['payload'],true);
$branch = $data['ref'];
if ($branch == 'refs/heads/master') {
  exec('cd /var/www/onreco;git pull origin master > /dev/null 2>&1 &');
}