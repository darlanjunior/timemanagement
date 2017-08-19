require 'rails_helper'

RSpec.describe User::Create do
  describe '#call' do
    before do
      @user = Admin.create({
        email: 'asdf@asdf.asdf',
        name: 'asdf',
        password: '12345678'
      })
    end

    subject {
      described_class.({
        name: 'oi',
        email: 'asdf@fdsa.asd',
        role: 'EndUser'
      }, 'current_user' => @user)}

    it { expect(subject[:'result.json'][:status]).to eq 'success' }
    it { expect(subject[:'result.json'][:errors]).to be_nil }
  end
end
