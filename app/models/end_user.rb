class EndUser < User
  validate :preferred_working_hours, :cannot_be_zero

  def cannot_be_zero
    if (
      preferred_working_hours &&
      preferred_working_hours.hour == 0 &&
      preferred_working_hours.min == 0
    )
      errors.add(:preferred_working_hours, 'invalid format')
    end
  end

  def as_json(except: nil, prefixes: nil, template: nil)
    super.merge({
      preferred_working_hours: preferred_working_hours.strftime('%H:%M')
    })
  end
end
