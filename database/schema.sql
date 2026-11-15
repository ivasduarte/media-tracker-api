CREATE TABLE watchlists (
  user_id VARCHAR(255) PRIMARY KEY
);

CREATE TABLE watchlist_entries (
  user_id VARCHAR(255) REFERENCES watchlists(user_id),
  media_id VARCHAR(255),
  title VARCHAR(255),
  type VARCHAR(50),
  watched BOOLEAN,
  rating INT,
  PRIMARY KEY (user_id, media_id)
);