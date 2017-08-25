require 'rails_helper'

RSpec.describe User::Create do
  describe '#call' do
    before do
      @user = manager_class.create({
        email: 'asdf@asdf.asdf',
        name: 'asdf',
        password: '12345678'
      })
    end

    subject do
      described_class.({
        name: 'oi',
        email: 'asdf@fdsa.asd',
        role: role
      }, 'current_user' => @user)
    end

    context 'when Admin creating EndUser' do
      let(:manager_class) {Admin}
      let(:role) {'EndUser'}

      it { expect(subject[:'result.json'][:errors]).to be_nil }
      it { expect(subject[:'result.json'][:status]).to eq 'success' }
    end

    context 'when Admin creating Manager' do
      let(:manager_class) {Admin}
      let(:role) {'Manager'}

      it { expect(subject[:'result.json'][:errors]).to be_nil }
      it { expect(subject[:'result.json'][:status]).to eq 'success' }
    end

    context 'when Admin creating Admin' do
      let(:manager_class) {Admin}
      let(:role) {'Admin'}

      it { expect(subject[:'result.json'][:errors]).not_to be_nil }
      it { expect(subject[:'result.json'][:status]).to eq 'error' }
      it { expect(subject['model']).not_to be_persisted }
    end

    context 'when Manager creating EndUser' do
      let(:manager_class) {Manager}
      let(:role) {'EndUser'}

      it { expect(subject[:'result.json'][:errors]).to be_nil }
      it { expect(subject[:'result.json'][:status]).to eq 'success' }
    end

    context 'when Manager creating Manager' do
      let(:manager_class) {Manager}
      let(:role) {'Manager'}

      it { expect(subject[:'result.json'][:errors]).not_to be_nil }
      it { expect(subject[:'result.json'][:status]).to eq 'error' }
      it { expect(subject['model']).not_to be_persisted }
    end
  end
end
