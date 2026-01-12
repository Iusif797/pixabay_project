import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Edit2, Save, X, User as UserIcon, Heart, Search, 
  Palette, Globe, Download, Trash2, ImageIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useProfile } from '@/hooks/useProfile';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from '@/hooks/useTranslation';
import { useGallery } from '@/hooks/useGallery';
import { useDownloads } from '@/hooks/useDownloads';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleOnHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};

export default function Profile() {
  const navigate = useNavigate();
  const { profile, updateProfile, changeAvatar, availableAvatars } = useProfile();
  const { isDark, toggleTheme } = useTheme();
  const { t, language, toggleLanguage } = useTranslation();
  const { favorites } = useGallery();
  const { downloads, clearDownloads } = useDownloads();
  const { user } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || profile.name,
    email: user?.email || profile.email,
    bio: profile.bio,
  });

  const handleSave = useCallback(() => {
    updateProfile(formData);
    setIsEditing(false);
  }, [formData, updateProfile]);

  const handleCancel = useCallback(() => {
    setFormData({
      name: profile.name,
      email: profile.email,
      bio: profile.bio,
    });
    setIsEditing(false);
  }, [profile]);

  const handleAvatarSelect = useCallback((avatar: string) => {
    changeAvatar(avatar);
    setShowAvatarPicker(false);
  }, [changeAvatar]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  }, [language]);

  const statsCards = useMemo(() => [
    {
      icon: Heart,
      count: favorites.length,
      label: t('profile.totalFavorites'),
      gradient: 'from-pink-500/10 to-purple-500/10',
      borderColor: 'border-pink-500/20',
      iconColor: 'text-pink-500',
      iconBg: 'bg-pink-500/20'
    },
    {
      icon: Search,
      count: profile.searchesCount,
      label: t('profile.searchesCount'),
      gradient: 'from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-500/20',
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-500/20'
    },
    {
      icon: Download,
      count: downloads.length,
      label: t('profile.totalDownloads'),
      gradient: 'from-green-500/10 to-emerald-500/10',
      borderColor: 'border-green-500/20',
      iconColor: 'text-green-500',
      iconBg: 'bg-green-500/20'
    }
  ], [favorites.length, profile.searchesCount, downloads.length, t]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container flex items-center justify-between h-16">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">{t('profile.back')}</span>
          </Button>
          <h1 className="text-xl font-semibold">{t('profile.title')}</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="container py-6 sm:py-8 lg:py-12 max-w-4xl">
        <motion.div 
          className="space-y-6"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10" />
              
              <div className="relative p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <motion.div 
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={cn(
                        "w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-5xl sm:text-6xl transition-all",
                        "bg-gradient-to-br from-primary to-purple-600 shadow-lg cursor-pointer"
                      )}
                      onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                    >
                      {profile.avatar}
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 shadow-lg"
                      onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </motion.div>

                  <div className="flex-1 text-center sm:text-left">
                    {!isEditing ? (
                      <>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{profile.name}</h2>
                        {profile.email && (
                          <p className="text-muted-foreground mb-1">{profile.email}</p>
                        )}
                        {profile.bio && (
                          <p className="text-sm text-muted-foreground mt-3">{profile.bio}</p>
                        )}
                      </>
                    ) : (
                      <div className="space-y-3">
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={t('profile.namePlaceholder')}
                          className="bg-background/50"
                        />
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t('profile.emailPlaceholder')}
                          className="bg-background/50"
                        />
                        <Textarea
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          placeholder={t('profile.bioPlaceholder')}
                          className="bg-background/50 min-h-20"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row sm:flex-col gap-2">
                    {!isEditing ? (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="hidden sm:inline">{t('profile.editProfile')}</span>
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={handleSave}
                          className="gap-2"
                        >
                          <Save className="w-4 h-4" />
                          <span className="hidden sm:inline">{t('profile.saveChanges')}</span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          className="gap-2"
                        >
                          <X className="w-4 h-4" />
                          <span className="hidden sm:inline">{t('profile.cancel')}</span>
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {showAvatarPicker && (
                  <motion.div 
                    className="mt-6 p-4 bg-background/80 backdrop-blur-sm rounded-xl border"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p className="text-sm font-medium mb-3">{t('profile.changeAvatar')}</p>
                    <div className="grid grid-cols-8 sm:grid-cols-12 gap-2">
                      {availableAvatars.map((avatar, index) => (
                        <motion.button
                          key={index}
                          onClick={() => handleAvatarSelect(avatar)}
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-2xl transition-all",
                            avatar === profile.avatar && "bg-primary/30 ring-2 ring-primary"
                          )}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {avatar}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-6 sm:p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                {t('profile.statistics')}
              </h3>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {statsCards.map((stat, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      "p-4 rounded-xl bg-gradient-to-br border",
                      stat.gradient,
                      stat.borderColor
                    )}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", stat.iconBg)}>
                        <stat.icon className={cn("w-6 h-6", stat.iconColor)} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stat.count}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {favorites.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => navigate('/?favorites=true')}
                  className="w-full mt-4 gap-2"
                >
                  <Heart className="w-4 h-4" />
                  {t('profile.viewFavorites')}
                </Button>
              )}
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  {t('profile.downloadedImages')}
                </h3>
                {downloads.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearDownloads}
                    className="gap-2 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('profile.clearDownloads')}</span>
                  </Button>
                )}
              </div>

              {downloads.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{t('profile.noDownloads')}</h4>
                  <p className="text-sm text-muted-foreground">{t('profile.noDownloadsDesc')}</p>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                  variants={staggerContainer}
                >
                  {downloads.map((image, index) => (
                    <motion.div
                      key={image.id}
                      className="group relative aspect-square rounded-xl overflow-hidden bg-muted"
                      variants={fadeInUp}
                      initial="rest"
                      whileHover="hover"
                      custom={index}
                    >
                      <motion.img
                        src={image.webformatURL}
                        alt={image.tags}
                        className="w-full h-full object-cover"
                        variants={scaleOnHover}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white text-xs font-medium truncate mb-1">
                            {image.tags.split(',')[0]}
                          </p>
                          <p className="text-white/70 text-xs">
                            {t('profile.downloadedOn')} {formatDate(image.downloadedAt)}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Card className="p-6 sm:p-8">
              <h3 className="text-xl font-semibold mb-6">{t('profile.preferences')}</h3>
              
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{t('profile.theme')}</p>
                      <p className="text-sm text-muted-foreground">
                        {isDark ? t('profile.darkMode') : t('profile.lightMode')}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleTheme}
                  >
                    {isDark ? t('profile.lightMode') : t('profile.darkMode')}
                  </Button>
                </motion.div>

                <motion.div 
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{t('profile.language')}</p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'English' : 'Русский'}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleLanguage}
                  >
                    {language === 'en' ? '🇷🇺 RU' : '🇬🇧 EN'}
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
