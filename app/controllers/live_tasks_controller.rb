class LiveTasksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user

  def index
    task = LiveTask.find_by(user: @user)
    if !task
      render json: {
        error: 'No live tasks currently active'
      }, status: 404
    else
      render json: {
        task: task,
        is_valid: task.start < 24.hours.ago
      }
    end
  end

  def create
    if LiveTask.where(user: @user).count > 0
      render json: {
        errors: ['There can only be one live task at a time']
      }, status: :conflict
      return
    end

    live_task = LiveTask.new(permitted_params.merge({
      start: Time.now,
      user: @user
    }))

    live_task.save!

    if live_task.errors.empty?
      render json: {
        status: 'success',
        data: live_task
      }
    else
      render json: {
        status: 'success',
        errors: live_task.errors.full_messages
      }
    end
  end

  def update
    live_task = LiveTask.find(params[:id])
    if !live_task
      render json: {
        status: 'error',
        errors: ['Could not locate task with id '+params[:id]]
      }, status: :not_found

      return
    end

    live_task.update(permitted_params)

    if live_task.errors.empty?
      render json: {
        status: 'success',
        data: live_task
      }
    else
      render json: {
        status: 'success',
        errors: live_task.errors.full_messages
      }
    end
  end

  def destroy
    live_task = LiveTask.find(params[:id])

    if live_task.user != @user
      render json: {
        error: 'Not allowed to end task'
      }, status: :unauthorized
      return
    end

    if live_task.start > 24.hours.ago && params[:completeTask] != 'false'
      time_entry = TimeEntry.new({
        name: live_task.name,
        description: live_task.description,
        date: live_task.start,
        duration: Time.at((Time.zone.now - live_task.start).to_i.abs).utc,
        user: @user
      })
      render json: live_task.destroy && time_entry.save
    else
      render json: live_task.destroy
    end
  end

  private
  def set_user
    @user = params[:user_id] ?
      User.find(params[:user_id]) :
      current_user
  end

  def permitted_params
    params.permit(
      :name,
      :description,
      :user_id
    )
  end
end
