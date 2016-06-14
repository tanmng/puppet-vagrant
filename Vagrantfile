# -*- mode: ruby -*-
# vi: set ft=ruby :
# 
# Vagrantfile
# Set up simple test environment for puppet

# apart from the puppetmaster node, create
# this many nodes
APP_INSTANCES=1
DB_INSTANCES=1

# the nodes will be called puppetmaster.irmo.net
# and app0.irmo.net
# and db0.irmo.net
DOMAIN="irmo.net"

# these nodes do not need a lot of RAM, 256MB
# is enough but you can tweak that here
MEMORY=256

# the instances are a hostonly network, this will
# be the prefix to the subnet they use
SUBNET="192.168.7"

# bootstrap command to ensure we have this fix puppet version
$set_puppet_version = <<EOF
/bin/rpm -Uvh http://yum.puppetlabs.com/el/6x/products/x86_64/puppetlabs-release-6-10.noarch.rpm
/usr/bin/yum clean all
/usr/bin/yum makecache
/usr/bin/yum -y erase puppet
/usr/bin/yum -y install puppet-3.1.0-1.el6
EOF

Vagrant.configure("2") do |config|
  config.vm.define :puppetmaster do |vmconfig|
    vmconfig.vm.box = "centos_6_3_x86_64"
    vmconfig.vm.network :private_network, ip: "#{SUBNET}.10"
    vmconfig.vm.hostname = "puppetmaster.#{DOMAIN}"
    vmconfig.vm.provider :virtualbox do |vb|
        vb.customize ["modifyvm", :id, "--memory", MEMORY]
    end
    vmconfig.vm.box = "centos_6_3_x86_64"
    vmconfig.vm.box_url = "http://developer.nrel.gov/downloads/vagrant-boxes/CentOS-6.3-x86_64-v20130101.box"
    vmconfig.vm.provision :shell, :inline => $set_puppet_version
    vmconfig.vm.provision :puppet, :options => ["--pluginsync --hiera_config /vagrant/deploy/hiera.yaml"], :module_path => "deploy/modules", :facter => { "middleware_ip" => "#{SUBNET}.10" } do |puppet|
      puppet.manifests_path = "deploy"
      puppet.manifest_file = "site.pp"
    end
  end

  APP_INSTANCES.times do |i|
    config.vm.define "node-app#{i}".to_sym do |vmconfig|
      vmconfig.vm.box = "centos_6_3_x86_64"
      vmconfig.vm.network :private_network, ip: "#{SUBNET}.%d" % (20 + i + 1)
      vmconfig.vm.provider :virtualbox do |vb|
          vb.customize ["modifyvm", :id, "--memory", MEMORY]
      end
      vmconfig.vm.hostname = "app%d.#{DOMAIN}" % i
      vmconfig.vm.box = "centos_6_3_x86_64"
      vmconfig.vm.box_url = "http://developer.nrel.gov/downloads/vagrant-boxes/CentOS-6.3-x86_64-v20130101.box"

      vmconfig.vm.provision :puppet,
          :options => ["--pluginsync --hiera_config /vagrant/deploy/hiera.yaml"],
          :module_path => "deploy/modules",
          :facter => { "puppetmaster" => "#{SUBNET}.10" } do |puppet|
        puppet.manifests_path = "deploy"
        puppet.manifest_file = "site.pp"
      end
    end
  end

  DB_INSTANCES.times do |i|
    config.vm.define "node-db#{i}".to_sym do |vmconfig|
      vmconfig.vm.box = "centos_6_3_x86_64"
      vmconfig.vm.network :private_network, ip: "#{SUBNET}.%d" % (30 + i + 1)
      vmconfig.vm.provider :virtualbox do |vb|
          vb.customize ["modifyvm", :id, "--memory", MEMORY]
      end
      vmconfig.vm.hostname = "db-%d.#{DOMAIN}" % i
      vmconfig.vm.box = "centos_6_3_x86_64"
      vmconfig.vm.box_url = "http://developer.nrel.gov/downloads/vagrant-boxes/CentOS-6.3-x86_64-v20130101.box"

      vmconfig.vm.provision :puppet,
          :options => ["--pluginsync --hiera_config /vagrant/deploy/hiera.yaml"],
          :module_path => "deploy/modules",
          :facter => { "puppetmaster" => "#{SUBNET}.10" } do |puppet|
        puppet.manifests_path = "deploy"
        puppet.manifest_file = "site.pp"
      end
    end
  end
end
