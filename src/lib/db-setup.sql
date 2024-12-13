-- Create meal_plans table with proper foreign key constraints
DROP TABLE IF EXISTS meal_plans;
CREATE TABLE meal_plans (
  meal_plan_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id BIGINT REFERENCES recipes(recipe_id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  day_of_week TEXT NOT NULL CHECK (day_of_week IN ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN')),
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'am-snack', 'lunch', 'pm-snack', 'dinner')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, recipe_id, week_start_date, day_of_week, meal_type)
);

-- Create indexes for better performance
CREATE INDEX idx_meal_plans_user_id ON meal_plans(user_id);
CREATE INDEX idx_meal_plans_recipe_id ON meal_plans(recipe_id);
CREATE INDEX idx_meal_plans_week_start ON meal_plans(week_start_date);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_meal_plans_updated_at
  BEFORE UPDATE ON meal_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';