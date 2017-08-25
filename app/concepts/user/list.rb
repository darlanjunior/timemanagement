require_relative './representers/user_representer'
require_relative './policies/user_policy'
class User::List < Trailblazer::Operation
  step :set_variables!
  step Policy::Pundit( UserPolicy, :list? )
  failure :unauthorized_response!
  step Nested( ::Page::List )
  step :filter_admins!
  step :represent!

  def unauthorized_response!(options)
    options[:'result.json'] = {
      errors: ['Not allowed to list users']
    }
  end

  def set_variables!(options, params:, **)
    params[:model] = ::User
    params[:searchable_fields] = [:name, :email]
    params[:page] = params[:page] || 1
    params[:items_per_page] = params[:items_per_page] || 5
  end

  def filter_admins!(options, current_user:, **)
    options[:count] = options[:count].where(role: hierarchy(current_user.role))
    options[:result] = options[:result].where(role: hierarchy(current_user.role))
  end

  def represent!(options, result:, count:, **)
    options[:'result.json'] =
      UserRepresenter
        .for_collection
        .new(result)
        .to_json(meta: {count: count.count})
  end

  def hierarchy role
    roles = ['Admin', 'Manager', 'EndUser']

    roles.slice((roles.index(role)+1)..-1)
  end
end
