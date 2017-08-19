require 'rails_helper'

RSpec.describe TimeEntry::Create do
  describe '#call' do
    before do
      @user = EndUser.new({
        email: 'asdf@asdf.asdf',
        name: 'asdf',
        role: 'EndUser',
        password: '12345678',
      })

      @user.skip_confirmation!
      @user.save
    end

    subject {
      described_class.({
        name: 'new task',
        description: 'task i\'m currently working on',
        date: '2017-12-31',
        duration: '08:00',
        user: @user
      }, 'current_user' => @user)}

    it { expect(subject[:'result.json'][:status]).to eq 'success' }
    it { expect(subject[:'result.json'][:errors]).to be_nil }
  end
end
