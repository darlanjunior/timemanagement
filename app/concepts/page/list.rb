class Page::List < Trailblazer::Operation
  extend Contract::DSL

  page_request_contract = Struct.new(
    :page,
    :searchable_fields,
    :items_per_page,
    :search_term,
    :order_by,
    :model
  )

  contract do
    page_request_contract.members.each {|prop| property prop}

    validates :model, presence: true
    validates :searchable_fields, presence: true
    validates :page, presence: true, numericality: true
    validates :items_per_page, presence: true, numericality: true
  end

  step Model(page_request_contract)
  step Contract::Build()
  step Contract::Validate()
  step :assemble_query!
  step :model!

  def assemble_query!(options, params:, **)
    fields = params[:searchable_fields]
    search_term = params[:search_term]

    options[:query] = search_term ? fields_to_sql(fields) : ''
    options[:search] = search_term ? search_term_to_sql(search_term, fields.size) : ''
  end

  def model!(options, params:, query:, search:, **)
    page = params[:page].to_i
    items_per_page = params[:items_per_page].to_i
    order_by = params[:order_by]
    model = params[:model]

    model = model.where(query, *search) if !search.blank?
    model = model.order(order_by) if order_by

    options[:count] = model
    offset = (page-1)*items_per_page
    options[:result] = model.limit(items_per_page).offset(offset)
  end

  private
  def fields_to_sql fields
    fields.map {|f| "#{f} like ?"}.join ' or '
  end

  def search_term_to_sql term, times
    ["%#{term}%"]*times
  end
end
