# Puppet vagrant

A simple vagrant file to set up an app and a database server


## How to use it

You will NOT need the puppetmaster for this task, so please turn on only

* ```node-app0```
* ```node-db0```
* ```node-db1``` (if you want some extra credit)

On each instance, the current directory ```puppet-vagrant``` will be shared to
the instance as ```/vagrant``` file system.
So, you can freely edit the manifests
and the modules in here, and use the following command to apply it to apply the
changes on your systems

```bash
puppet apply --modulepath=/vagrant/deploy/modules /vagrant/deploy/site.pp
```

## Your tasks

You are **NOT** allowed to use community modules (from puppetforge).

You can receive up to ```1.5``` credit in this module.

* Write the manifest (or create new class if you want to) to set up ```node-app0``` and ```node-db0``` (again, if you will only need to set up ```node-db1``` for some extra credits).

* Set up the database on ```node-db0``` to allow connection from ```node-app0```

* Deploy the ```nodejs``` application in ```node_app``` to ```node-app0```,
configure it and run and it as a service.


* You will receive ```0.75``` credit for a running application in ```node-app0``` - meaning I can clone your repository, ```vagrant up``` and have an app running correctly on the port

* For additional ```0.25``` credit, please explain **WHY THE FOLLOWING CODE NEED
2 RUNS TO WORK CORRECTLY** (this is pseudocode, please excuse any mistakes)

```puppet

$switch_direction = 1; # 1: nginx to apache, 0: apache to nginx

case $switch_direction {
0: {
       $nginx_port = 80;
       $apache_port = 8000;
   }
1: {
       $nginx_port = 8000;
       $apache_port = 80;
   }
}

# Configure httpd to listen on new port
file { 'httpd  config':
    ....
}
service {'httpd':
    ensure  => running,
    require => File ['httpd  config'],
}

# configure nginx to listen on new port
file { 'nginx  config':
    ....
}
service {'nginx':
    ensure  => running,
    require => File ['nginx  config'],
}
```

* You will receive up to ```0.25``` credit for following the [Puppet style
guide](https://docs.puppet.com/guides/style_guide.html) - use
[puppet-link](http://puppet-lint.com/) to confirm your code.
Also, you need to create spec tests for your module.


* For additional ```0.25``` credit, please enable the second DB instance ```node-db1``
and set up mysql replication between the 2 DB instances.
