node default {
  if $::hostname =~ /^app/ {
    $role = 'app'
  } else {
    $role = 'db'
  }

  class { "roles::${role}": }
}
