require 'rails_helper'

RSpec.describe DeviseTokenAuth::RegistrationsController, type: :controller do
  ActionController::TestCase

  describe '#update' do
    before do
      user = model_class.new(
        email: 'email@email.com',
        password: '1234qwer',
        name: 'a name'
      )
      user.skip_confirmation!
      user.save
      headers = user.create_new_auth_token
      request.headers.merge!(headers)
      request.env["devise.mapping"] = Devise.mappings[:user]

      patch :update, params: {preferred_working_hours: '08:00'}
    end

    subject { JSON.parse(response.body) }

    context 'when EndUser' do
      let(:model_class) { EndUser }
      let(:expected_response) {{
        'status' => 'success',
        'data' => a_hash_including({
          'name' => 'a name',
          'role' => 'EndUser',
          'preferred_working_hours' => '08:00'
        })
      }}

      it { is_expected.to match(expected_response) }
    end
  end
end
