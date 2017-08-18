class RoleRouteConstraint
  def matches?(request)
    request.headers.key? 'access-token'
  end
end
