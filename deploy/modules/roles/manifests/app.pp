# All the config needed for app server
class roles::app {
  file { '/home/vagrant/done':
    ensure  => present,
    content => 'App instance',
  }
}
