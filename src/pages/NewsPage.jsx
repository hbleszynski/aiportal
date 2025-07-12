import React, { useState, useEffect } from 'react';
import { withTheme } from 'styled-components';
import { fetchArticlesByCategory, fetchArticleContent } from '../services/rssService';
import { sendMessageToBackend } from '../services/aiService';
import {
  NewsContainer,
  Header,
  Title,
  RefreshButton,
  FilterBar,
  FilterButton,
  ArticlesGrid,
  ArticleCard,
  ArticleImage,
  ArticleContent,
  ArticleTag,
  ArticleTitle,
  ArticleDescription,
  ArticleFooter,
  ArticleSource,
  BookmarkIcon,
  ArticleDetailOverlay,
  ArticleDetailContainer,
  ArticleDetailContent,
  CloseButton,
  DetailTitle,
  DetailBody,
  DetailImage,
  DetailIntro,
  ArticleMetadata,
  AuthorSection,
  AuthorAvatar,
  AuthorInfo,
  AuthorName,
  ReadTime,
  MetadataRight,
  PublishTime,
  SourceTags,
  SourceTag,
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
  ErrorContainer,
  ErrorMessage,
  RetryButton,
  EmptyStateContainer,
  EmptyStateMessage
} from './NewsPage.styled';


const filters = [
    {
      name: 'Top',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
    },
    {
      name: 'Saved',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
    },
    {
      name: 'Tech',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="22" y2="7"></line><line x1="2" y1="17" x2="22" y2="17"></line></svg>
    },
    {
      name: 'Sports',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>
    },
    {
      name: 'Finance',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
    },
    {
      name: 'Art',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
    },
    {
      name: 'TV',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
    },
    {
      name: 'Politics',
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
    }
  ];

const ArticleDetailView = ({ article, onClose }) => {
  const [articleContent, setArticleContent] = useState(null);
  const [loadingContent, setLoadingContent] = useState(true);
  const [contentError, setContentError] = useState(null);
  const [summary, setSummary] = useState('');
  const [summarizing, setSummarizing] = useState(false);

  useEffect(() => {
    const loadArticleContent = async () => {
      setLoadingContent(true);
      setContentError(null);
      setSummary('');
      
      try {
        const content = await fetchArticleContent(article.url, article.description);
        setArticleContent(content);
        
        if (content && content.content) {
          setSummarizing(true);
          try {
            const summaryPrompt = `Please provide a concise summary of the following news article:\n\n---\n\n${content.content}`;
            const result = await sendMessageToBackend('gemini-2.5-flash', summaryPrompt);
            if (result && result.response) {
              setSummary(result.response);
            } else {
              setSummary('Could not generate summary.');
            }
          } catch (summaryError) {
            console.error('Error generating summary:', summaryError);
            setSummary('Failed to generate summary.');
          } finally {
            setSummarizing(false);
          }
        }

      } catch (error) {
        console.error('Error loading article content:', error);
        setContentError('Failed to load full article content');
        const fallbackContent = {
          content: article.description || 'No content available',
          title: article.title,
          image: article.image,
          extracted: false
        };
        setArticleContent(fallbackContent);
        
        // Still try to generate a summary from the description
        if (article.description && article.description.length > 20) {
          setSummarizing(true);
          try {
            const summaryPrompt = `Please provide a concise summary and analysis of the following news article:\n\n${article.title}\n\n${article.description}`;
            const result = await sendMessageToBackend('gemini-2.5-flash', summaryPrompt);
            if (result && result.response) {
              setSummary(result.response);
            } else {
              setSummary('Could not generate summary.');
            }
          } catch (summaryError) {
            console.error('Error generating summary:', summaryError);
            setSummary('Failed to generate summary.');
          } finally {
            setSummarizing(false);
          }
        }
      } finally {
        setLoadingContent(false);
      }
    };

    loadArticleContent();
  }, [article]);

  const displayContent = articleContent || {
    content: article.description || 'Loading...',
    title: article.title,
    image: article.image
  };

  const formatContent = (content) => {
    if (!content) return [];
    // Split content into paragraphs
    return content.split('\n\n').filter(p => p.trim());
  };

  const contentParagraphs = formatContent(displayContent.content);

  return (
    <ArticleDetailOverlay onClick={onClose}>
      <ArticleDetailContainer onClick={(e) => e.stopPropagation()}>
        <ArticleDetailContent>
            <DetailTitle>{displayContent.title || article.title}</DetailTitle>
            
            <ArticleMetadata>
              <AuthorSection>
                <AuthorAvatar>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="8" r="3"/>
                    <path d="M6.168 18.849a4 4 0 0 1 3.832-2.849h4a4 4 0 0 1 3.834 2.855"/>
                  </svg>
                </AuthorAvatar>
                <AuthorInfo>
                  <AuthorName>
                    {displayContent.author ? `By ${displayContent.author}` : `Source: ${article.source}`}
                  </AuthorName>
                  <ReadTime>
                    {displayContent.publishDate 
                      ? new Date(displayContent.publishDate).toLocaleDateString()
                      : new Date(article.pubDate).toLocaleDateString()}
                  </ReadTime>
                </AuthorInfo>
              </AuthorSection>
              
              <MetadataRight>
                <PublishTime>Published {new Date(article.pubDate).toLocaleString()}</PublishTime>
              </MetadataRight>
            </ArticleMetadata>

            <SourceTags>
              <SourceTag>{article.source}</SourceTag>
              <SourceTag>{article.category}</SourceTag>
              {articleContent?.extracted && <SourceTag style={{ backgroundColor: '#28a745' }}>Full Article</SourceTag>}
            </SourceTags>
            
            {(displayContent.image || article.image) && 
              <DetailImage
                src={displayContent.image || article.image}
                alt={displayContent.title || article.title}
                $size={article.size}
                onError={(e) => {
                  console.log('Image failed to load:', e.target.src);
                  e.target.onerror = null; // Prevent infinite loop
                  
                  // Try multiple fallbacks
                  if (e.target.src.includes('pollinations.ai')) {
                    console.log('Trying LoremFlickr fallback...');
                    const words = article.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ').filter(Boolean).slice(0, 3);
                    e.target.src = `https://loremflickr.com/800/600/${words.join(',')}`;
                  } else if (e.target.src.includes('loremflickr.com')) {
                    console.log('Trying Picsum fallback...');
                    e.target.src = `https://picsum.photos/seed/${encodeURIComponent(article.id || article.title)}/800/600`;
                  } else {
                    console.log('All fallbacks failed, hiding image');
                    e.target.style.display = 'none';
                  }
                }}
                onLoad={(e) => {
                  console.log('Image loaded successfully:', e.target.src);
                }}
              />
            }
            
            <DetailBody>
              {loadingContent ? (
                <LoadingContainer>
                  <LoadingSpinner />
                  <LoadingText>Loading article...</LoadingText>
                </LoadingContainer>
              ) : contentError ? (
                <>
                  <ErrorMessage style={{ textAlign: 'center', marginBottom: '20px' }}>{contentError}</ErrorMessage>
                  <p>{article.description}</p>
                </>
              ) : summarizing ? (
                <LoadingContainer>
                  <LoadingSpinner />
                  <LoadingText>Generating summary...</LoadingText>
                </LoadingContainer>
              ) : (
                summary.split('\n\n').map((paragraph, index) => (
                  <p key={index} style={{ marginBottom: '18px' }}>{paragraph}</p>
                ))
              )}
              
              <p style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e0e0e0' }}>
                <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                  Read the original article on {article.source} →
                </a>
              </p>
            </DetailBody>
        </ArticleDetailContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </ArticleDetailContainer>
    </ArticleDetailOverlay>
  );
};

const NewsPage = ({ collapsed }) => {
  const [activeFilter, setActiveFilter] = useState('Top');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [savedArticles, setSavedArticles] = useState(() => {
    try {
      const saved = window.localStorage.getItem('savedNewsArticles');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse saved articles from localStorage', e);
      return [];
    }
  });

  const loadArticles = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);
    
    try {
      const categoryToFetch = activeFilter.toLowerCase();
      const fetchedArticles = await fetchArticlesByCategory(categoryToFetch, 20);
      setArticles(fetchedArticles);
      setLastRefresh(new Date());
    } catch (err) {
      console.error('Error loading articles:', err);
      setError(err.message || 'Failed to load articles');
      setArticles([]);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [activeFilter]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      loadArticles(false); // Don't show loading spinner for auto-refresh
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [activeFilter]);

  useEffect(() => {
    try {
      window.localStorage.setItem('savedNewsArticles', JSON.stringify(savedArticles));
    } catch (e) {
      console.error('Failed to save articles to localStorage', e);
    }
  }, [savedArticles]);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  const handleSaveArticle = (e, articleId) => {
    e.stopPropagation();
    setSavedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleRetry = () => {
    loadArticles();
  };

  const handleRefresh = () => {
    loadArticles();
  };

  const displayArticles = activeFilter === 'Saved' 
    ? articles.filter(article => savedArticles.includes(article.id))
    : articles;

  return (
    <NewsContainer $collapsed={collapsed}>
      <Header>
        <Title>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          News
        </Title>
        <RefreshButton onClick={handleRefresh} disabled={loading} $loading={loading}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>
          </svg>
          {loading ? 'Refreshing...' : 'Refresh'}
        </RefreshButton>
      </Header>

      <FilterBar>
        {filters.map(filter => (
          <FilterButton
            key={filter.name}
            $active={activeFilter === filter.name}
            onClick={() => setActiveFilter(filter.name)}
          >
            {filter.icon}
            {filter.name}
          </FilterButton>
        ))}
      </FilterBar>

      {loading && (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Loading fresh articles...</LoadingText>
        </LoadingContainer>
      )}

      {error && !loading && (
        <ErrorContainer>
          <ErrorMessage>Failed to load articles</ErrorMessage>
          <p>{error}</p>
          <RetryButton onClick={handleRetry}>Try Again</RetryButton>
        </ErrorContainer>
      )}

      {!loading && !error && displayArticles.length === 0 && (
        <EmptyStateContainer>
          <EmptyStateMessage>
            {activeFilter === 'Saved' 
              ? 'No saved articles yet. Click the bookmark icon to save articles.'
              : 'No articles available for this category.'}
          </EmptyStateMessage>
        </EmptyStateContainer>
      )}

      {!loading && !error && displayArticles.length > 0 && (
        <ArticlesGrid>
          {displayArticles.map(article => {
            const filter = filters.find(f => f.name.toLowerCase() === article.category);
            const isSaved = savedArticles.includes(article.id);
            return (
              <ArticleCard key={article.id} $size={article.size} onClick={() => handleArticleClick(article)}>
                {article.image && (
                  <ArticleImage
                    src={article.image}
                    alt={article.title}
                    $size={article.size}
                    onError={(e) => {
                      console.log('Image failed to load:', e.target.src);
                      e.target.onerror = null; // Prevent infinite loop
                      
                      // Try multiple fallbacks
                      if (e.target.src.includes('pollinations.ai')) {
                        console.log('Trying LoremFlickr fallback...');
                        const words = article.title.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ').filter(Boolean).slice(0, 3);
                        e.target.src = `https://loremflickr.com/800/600/${words.join(',')}`;
                      } else if (e.target.src.includes('loremflickr.com')) {
                        console.log('Trying Picsum fallback...');
                        e.target.src = `https://picsum.photos/seed/${encodeURIComponent(article.id || article.title)}/800/600`;
                      } else {
                        console.log('All fallbacks failed, hiding image');
                        e.target.style.display = 'none';
                      }
                    }}
                    onLoad={(e) => {
                      console.log('Image loaded successfully:', e.target.src);
                    }}
                  />
                )}
                <ArticleContent $size={article.size}>
                  <ArticleTitle $size={article.size}>{article.title}</ArticleTitle>
                  {filter && (
                    <ArticleTag>
                      {filter.icon}
                      <span>{filter.name}</span>
                    </ArticleTag>
                  )}
                  <ArticleDescription $size={article.size}>{article.description}</ArticleDescription>
                  <ArticleFooter>
                    <ArticleSource>{article.source}</ArticleSource>
                    <BookmarkIcon onClick={(e) => handleSaveArticle(e, article.id)}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                      </svg>
                    </BookmarkIcon>
                  </ArticleFooter>
                </ArticleContent>
              </ArticleCard>
            )
          })}
        </ArticlesGrid>
      )}

      {selectedArticle && (
        <ArticleDetailView article={selectedArticle} onClose={handleCloseArticle} />
      )}
    </NewsContainer>
  );
};

export default NewsPage; 