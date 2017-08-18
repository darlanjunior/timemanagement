class TimeEntriesController < ApplicationController
  def index
    render json: {time_entries: ['a', 'b']}
  end
end
