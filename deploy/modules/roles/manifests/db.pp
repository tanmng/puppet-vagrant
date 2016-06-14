# All the config needed for app server
class roles::db {
  file { '/home/vagrant/done':
    ensure  => present,
    content => 'DB instance',
  }
}
